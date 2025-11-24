#!/usr/bin/env python3
"""
Generate an alphabetized #gameGrid in dashboard/games.html
- preserves existing cards (reads current cards)
- adds games found in james/index.html (and avoids duplicates)
- outputs card HTML in the same format as existing page
"""
import re
from html import unescape

ROOT = '.'
GAMES_HTML = 'dashboard/games.html'
JAMES_HTML = 'james/index.html'

# read files
with open(GAMES_HTML, 'r', encoding='utf-8') as f:
    page = f.read()
with open(JAMES_HTML, 'r', encoding='utf-8') as f:
    james = f.read()

# extract current #gameGrid content
m = re.search(r"(<div[^>]+id=[\"']gameGrid[\"'][\s\S]*?>)([\s\S]*?)(</div>)", page, flags=re.I)
if not m:
    raise SystemExit('Could not find #gameGrid in {}'.format(GAMES_HTML))
grid_open, grid_inner, grid_close = m.group(1), m.group(2), m.group(3)

# helper to parse .card divs
card_re = re.compile(r"<div\s+class=[\"']card[\"']\s+data-name=[\"'](.*?)[\"']\s+onclick=[\"']location.href=\'(.*?)\'[\"']\s*>[\s\S]*?<img[^>]*src=[\"'](.*?)[\"'][^>]*>\s*(.*?)\s*</div>", flags=re.I)
cards = {}
for cm in card_re.finditer(grid_inner):
    name = unescape(cm.group(1).strip())
    href = cm.group(2).strip()
    img = cm.group(3).strip()
    label = unescape(re.sub(r'\s+', ' ', cm.group(4).strip()))
    cards[name.lower()] = {
        'name': name,
        'href': href,
        'img': img,
        'label': label
    }

# parse james entries: <a href=... class="game-item"> <img src=...> <h3>Title</h3>
j_re = re.compile(r"<a[^>]+href=[\"'](.*?)[\"'][^>]*class=[\"']game-item[\"'][\s\S]*?>[\s\S]*?<img[^>]*src=[\"'](.*?)[\"'][^>]*>[\s\S]*?<h3[^>]*>(.*?)</h3>", flags=re.I)
for jm in j_re.finditer(james):
    href = jm.group(1).strip()
    img = jm.group(2).strip()
    title = re.sub(r'<[^>]+>', '', jm.group(3)).strip()
    key = title.lower()
    if key in cards:
        # prefer existing href/img if present; but update if missing
        if not cards[key].get('img') and img:
            cards[key]['img'] = img
        if not cards[key].get('href') and href:
            cards[key]['href'] = href
    else:
        # normalize href: if it's a site-relative (starts with /jarbeefis), keep as-is
        cards[key] = {
            'name': title,
            'href': href,
            'img': img,
            'label': title
        }

# create sorted list by display name
sorted_cards = sorted(cards.values(), key=lambda x: x['label'].lower())

# build HTML for cards
def escape_attr(s):
    return s.replace('"', '&quot;')

card_html = []
for c in sorted_cards:
    href = c['href'] or '#'
    img = c['img'] or 'https://via.placeholder.com/400x225?text=No+Image'
    label = c['label']
    # ensure href for onclick uses single quotes and absolute path where appropriate
    card = f"  <div class=\"card\" data-name=\"{escape_attr(label)}\" onclick=\"location.href='{href}'\">\n    <img src=\"{escape_attr(img)}\" alt=\"{escape_attr(label).lower().replace(' ', '-') }\">\n    {label}\n  </div>"
    card_html.append(card)

new_grid_inner = '\n'.join(card_html)

# replace the old grid_inner with new one
new_page = page[:m.start(2)] + '\n' + new_grid_inner + '\n' + page[m.end(2):]

with open(GAMES_HTML, 'w', encoding='utf-8') as f:
    f.write(new_page)

print('Updated', GAMES_HTML, 'with', len(sorted_cards), 'cards')
