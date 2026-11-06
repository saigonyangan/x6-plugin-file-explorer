# @x6_ai/x6-plugin-file-explorer

[中文](./README.md) · English

Browse and edit workspace files inside DeepSeek Harness: center tree + multi-tab editor; the left sidebar keeps the official conversation list.

Repo: [GitHub](https://github.com/saigonyangan/x6-plugin-file-explorer)

## Install

```bash
dsh plugin --profile web add github:saigonyangan/x6-plugin-file-explorer#v6.1.1
```

Fully restart `dsh web` (or Desktop Host) after install, then open the printed `?token=` URL.

## What it does

- Top **Files** tab: tree | editor split; pins the session working directory
- Multi-tab editing with dirty marks; save with `Ctrl/Cmd+S`
- Markdown source / preview toggle
- Create, rename, delete (non-empty directories are rejected)
- Optional: open file-path links from the conversation in the editor
- Monaco via jsDelivr CDN, with `<textarea>` fallback on failure or timeout

## How to use

1. Open or create a conversation
2. Switch to the **Files** tab
3. Browse the tree; open a file to edit
4. Save with `Ctrl/Cmd+S`
5. Right-click tree nodes to create / rename / delete

Appearance (background, font size, saved schemes) is available from the editor toolbar.

## Optional config

Settings → Plugins → **X6 file explorer** (hot-updates), for example:

| Key | Meaning | Default |
|-----|---------|---------|
| `root` | Browse root | process working directory |
| `openLinksInEditor` | Open conversation file links in the editor | `false` |

## License

MIT © X6
