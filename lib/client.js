window.__ModuleLoader__.load({
	id: "@x6_ai/x6-plugin-file-explorer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let zod = require("zod");
		let marked = require("marked");
		//#region lib/types/shared/settings-contract.js
		/** Settings namespace contract visible to both Host and Client. */
		/**
		* Profile entry id from `cordis.patch.yml` (`x6-file-explorer`).
		* dsh ≥ 0.1.7 projects volatile Config under this id into `configForms`.
		*/
		const FILE_EXPLORER_SETTINGS_NS = "x6-file-explorer";
		//#endregion
		//#region lib/types/shared/rpc-contract.js
		/** Shared RPC DTOs and fail codes for `explorerFs`. */
		const EXPLORER_FS_SERVICE = "explorerFs";
		//#endregion
		//#region lib/types/client/rpc.js
		/**
		* Client Typert contribution + typed call helpers for `explorerFs`.
		*/
		const FailCode = zod.z.enum([
			"OUT_OF_ROOT",
			"NOT_FOUND",
			"NOT_EMPTY",
			"EXISTS",
			"IS_BINARY",
			"IS_DIR",
			"IO"
		]);
		const FailResultSchema = zod.z.object({
			ok: zod.z.literal(false),
			code: FailCode,
			message: zod.z.string()
		});
		const OkResultSchema = zod.z.object({ ok: zod.z.literal(true) });
		const RootOkSchema = zod.z.object({
			ok: zod.z.literal(true),
			root: zod.z.string()
		});
		const FsEntrySchema = zod.z.object({
			name: zod.z.string(),
			path: zod.z.string(),
			kind: zod.z.enum(["file", "dir"]),
			size: zod.z.number().optional()
		});
		const ListOkSchema = zod.z.object({
			ok: zod.z.literal(true),
			entries: zod.z.array(FsEntrySchema)
		});
		const ReadOkSchema = zod.z.object({
			ok: zod.z.literal(true),
			content: zod.z.string()
		});
		const RootResultSchema = zod.z.union([RootOkSchema, FailResultSchema]);
		const ListResultSchema = zod.z.union([ListOkSchema, FailResultSchema]);
		const ReadResultSchema = zod.z.union([ReadOkSchema, FailResultSchema]);
		const MutateResultSchema = zod.z.union([OkResultSchema, FailResultSchema]);
		const PKG = "@x6_ai/x6-plugin-file-explorer";
		const Str = zod.z.string();
		function strParam(name) {
			return {
				name,
				wire: name,
				source: "json",
				codec: {
					mode: "strict",
					typeSymbol: `${PKG}/types#String`,
					create: () => Str
				}
			};
		}
		function resultCodec(schema, typeSymbol) {
			return {
				mode: "strict",
				typeSymbol: `${PKG}/types#${typeSymbol}`,
				create: () => schema
			};
		}
		function invocation(method, parameters, result) {
			return {
				id: `${PKG}#${EXPLORER_FS_SERVICE}/${method}`,
				service: EXPLORER_FS_SERVICE,
				namespace: EXPLORER_FS_SERVICE,
				method,
				invocation: { kind: "direct" },
				parameters,
				result
			};
		}
		/** Strict Client contribution mounted via `ctx.remote.$mount`. */
		const TYPERT_REMOTE = {
			package: PKG,
			descriptors: [
				invocation("getRoot", [], resultCodec(RootOkSchema, "RootOk")),
				invocation("setRoot", [strParam("root")], resultCodec(RootResultSchema, "RootResult")),
				invocation("list", [strParam("path")], resultCodec(ListResultSchema, "ListResult")),
				invocation("read", [strParam("path")], resultCodec(ReadResultSchema, "ReadResult")),
				invocation("write", [strParam("path"), strParam("content")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("mkdir", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("rename", [strParam("from"), strParam("to")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("unlink", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("revealRoot", [], resultCodec(MutateResultSchema, "MutateResult")),
				invocation("revealPath", [strParam("path")], resultCodec(MutateResultSchema, "MutateResult"))
			]
		};
		async function unwrap(promise) {
			const result = await promise;
			if (!result.ok) return {
				ok: false,
				error: {
					kind: "transport",
					message: result.error.message
				}
			};
			const value = result.value;
			if (typeof value === "object" && value !== null && "ok" in value && value.ok === false) {
				const fail = value;
				return {
					ok: false,
					error: {
						kind: "business",
						message: fail.message,
						code: fail.code
					}
				};
			}
			return {
				ok: true,
				value
			};
		}
		/** Thin helpers over `ctx.remote.explorerFs` after mount. */
		function createExplorerApi(ctx) {
			const remote = () => ctx.remote.explorerFs;
			return {
				getRoot: () => unwrap(remote().getRoot()),
				setRoot: (root) => unwrap(remote().setRoot(root)),
				list: (path) => unwrap(remote().list(path)),
				read: (path) => unwrap(remote().read(path)),
				write: (path, content) => unwrap(remote().write(path, content)),
				mkdir: (path) => unwrap(remote().mkdir(path)),
				rename: (from, to) => unwrap(remote().rename(from, to)),
				unlink: (path) => unwrap(remote().unlink(path)),
				revealRoot: () => unwrap(remote().revealRoot()),
				revealPath: (path) => unwrap(remote().revealPath(path))
			};
		}
		//#endregion
		//#region lib/types/client/state/tabs.js
		/**
		* Client-side tab roster for the file explorer editor.
		*
		* `getSnapshot` MUST return a stable reference between mutations — React's
		* useSyncExternalStore infinite-loops if every call allocates a new object.
		*/
		const EMPTY = {
			open: [],
			activePath: null
		};
		function titleOf(path) {
			if (path === "") return "/";
			const parts = path.split("/");
			return parts[parts.length - 1] || path;
		}
		/**
		* Mutable tab roster with subscribe semantics for React.
		*/
		var TabsStore = class {
			#open = [];
			#activePath = null;
			#snapshot = EMPTY;
			#listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.#snapshot;
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			/** Open or activate a path. Returns whether a new tab was created. */
			open(path) {
				if (this.#open.find((t) => t.path === path) !== void 0) {
					if (this.#activePath === path) return false;
					this.#activePath = path;
					this.#emit();
					return false;
				}
				this.#open = [...this.#open, {
					path,
					title: titleOf(path)
				}];
				this.#activePath = path;
				this.#emit();
				return true;
			}
			activate(path) {
				if (!this.#open.some((t) => t.path === path)) return;
				if (this.#activePath === path) return;
				this.#activePath = path;
				this.#emit();
			}
			/**
			* Close a tab. Activates neighbor to the right, else left, else null.
			* @returns whether the tab was present.
			*/
			close(path) {
				const index = this.#open.findIndex((t) => t.path === path);
				if (index < 0) return false;
				const next = this.#open.filter((t) => t.path !== path);
				this.#open = next;
				if (this.#activePath === path) {
					const right = next[index];
					const left = next[index - 1];
					this.#activePath = right?.path ?? left?.path ?? null;
				}
				this.#emit();
				return true;
			}
			/** Rename an open tab path (after a successful host rename). */
			rename(from, to) {
				this.#open = this.#open.map((t) => t.path === from ? {
					path: to,
					title: titleOf(to)
				} : t);
				if (this.#activePath === from) this.#activePath = to;
				this.#emit();
			}
			#emit() {
				this.#snapshot = {
					open: this.#open,
					activePath: this.#activePath
				};
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/buffers.js
		/**
		* Per-path editor buffers and dirty tracking.
		*/
		/**
		* Text buffers keyed by relative path.
		*/
		var BuffersStore = class {
			#map = /* @__PURE__ */ new Map();
			#listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			get(path) {
				return this.#map.get(path);
			}
			/** Load or replace buffer from a successful read. Clears dirty. */
			load(path, content) {
				this.#map.set(path, {
					path,
					content,
					savedContent: content
				});
				this.#emit();
			}
			/** Update draft content; dirty when content !== savedContent. */
			setContent(path, content) {
				const prev = this.#map.get(path);
				if (prev !== void 0 && prev.content === content) return;
				if (prev === void 0) this.#map.set(path, {
					path,
					content,
					savedContent: content
				});
				else this.#map.set(path, {
					...prev,
					content
				});
				this.#emit();
			}
			/** Mark current content as saved (after successful write). */
			markSaved(path) {
				const prev = this.#map.get(path);
				if (prev === void 0) return;
				this.#map.set(path, {
					...prev,
					savedContent: prev.content
				});
				this.#emit();
			}
			isDirty(path) {
				const entry = this.#map.get(path);
				if (entry === void 0) return false;
				return entry.content !== entry.savedContent;
			}
			drop(path) {
				if (!this.#map.delete(path)) return;
				this.#emit();
			}
			/** Move buffer after rename. */
			rename(from, to) {
				const prev = this.#map.get(from);
				if (prev === void 0) return;
				this.#map.delete(from);
				this.#map.set(to, {
					...prev,
					path: to
				});
				this.#emit();
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/md-mode.js
		/**
		* Per-path markdown preview vs source mode (in-memory only).
		*/
		function isMarkdownPath(path) {
			const lower = path.toLowerCase();
			return lower.endsWith(".md") || lower.endsWith(".markdown");
		}
		/**
		* Remember preview/source preference per path for the session.
		*/
		var MdModeStore = class {
			#modes = /* @__PURE__ */ new Map();
			#listeners = /* @__PURE__ */ new Set();
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			get(path) {
				return this.#modes.get(path) ?? "source";
			}
			set(path, mode) {
				this.#modes.set(path, mode);
				this.#emit();
			}
			toggle(path) {
				const next = this.get(path) === "preview" ? "source" : "preview";
				this.set(path, next);
				return next;
			}
			rename(from, to) {
				const mode = this.#modes.get(from);
				if (mode === void 0) return;
				this.#modes.delete(from);
				this.#modes.set(to, mode);
				this.#emit();
			}
			drop(path) {
				if (!this.#modes.delete(path)) return;
				this.#emit();
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		//#endregion
		//#region lib/types/client/state/mode.js
		/**
		* In-memory explorer mode flag (sidebar occupancy).
		* Subscribe API matches useSyncExternalStore (`() => void` listeners).
		*/
		var ExplorerModeStore = class {
			enabled = false;
			listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.enabled;
			subscribe = (listener) => {
				this.listeners.add(listener);
				return () => {
					this.listeners.delete(listener);
				};
			};
			setEnabled(next) {
				if (this.enabled === next) return;
				this.enabled = next;
				for (const listener of this.listeners) listener();
			}
			toggle() {
				this.setEnabled(!this.enabled);
				return this.enabled;
			}
		};
		//#endregion
		//#region lib/types/client/root-events.js
		/** Notify explorer UI after the Host workspace root is re-pinned. */
		const listeners = /* @__PURE__ */ new Set();
		/** Subscribe to successful session/root pins. */
		function subscribeRootPinned(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		}
		/** Fire after `setRoot` succeeds so the tree reloads against the new cwd. */
		function notifyRootPinned() {
			for (const listener of listeners) listener();
		}
		//#endregion
		//#region lib/types/client/locales.js
		/** Locales for the file explorer plugin. */
		const NS = "file-explorer";
		const zh = {
			viewLabel: "文件",
			emptyWorkspace: "工作区为空",
			settingsTitle: "X6 文件浏览",
			settingsDescription: "工作区根目录与对话内文件链接打开方式",
			settingsRoot: "兜底根目录",
			settingsRootHint: "会话未钉定 cwd 时使用；会话打开文件浏览时会优先钉到会话工作区",
			settingsOpenLinks: "在编辑器中打开对话内文件链接",
			settingsOpenLinksHint: "拦截会话消息里的本地路径链接，并在文件编辑器中打开",
			expand: "展开",
			collapse: "折叠",
			expandAll: "全部展开",
			collapseAll: "全部折叠",
			readOnly: "当前不可写入设置",
			newFile: "新建文件",
			newFolder: "新建文件夹",
			refresh: "刷新",
			rename: "重命名",
			delete: "删除",
			promptNewFile: "新文件名",
			promptNewFolder: "新文件夹名",
			promptRename: "重命名为",
			confirmDelete: "确定删除「{name}」？",
			openInFileManager: "在文件管理器中打开",
			revealPathInFileManager: "打开文件所在目录",
			tabClose: "关闭",
			tabCloseRight: "关闭右侧",
			tabCloseAll: "关闭所有",
			confirmCloseDirty: "有未保存的更改，确定关闭？",
			editorEmpty: "从左侧目录树打开文件",
			editorSave: "保存",
			editorSource: "源码",
			editorPreview: "预览",
			editorSaved: "已保存",
			editorTextareaMode: "文本框模式",
			treeAriaLabel: "工作区文件",
			editorAppearance: "主题",
			editorTheme: "底色",
			editorThemeDark: "深色",
			editorThemeLight: "浅色",
			editorThemeHighContrast: "高对比",
			editorFontSize: "字号",
			editorFontSmaller: "缩小字号",
			editorFontLarger: "放大字号",
			editorCustomColor: "自定义色值",
			editorCustomColorHint: "支持 #RGB / #RRGGBB / #RRGGBBAA",
			editorCustomColorInvalid: "色值无效，请使用 HTML 十六进制颜色",
			editorCustomColorClear: "清除",
			editorScheme: "方案",
			editorSchemeSave: "保存当前方案",
			editorSchemeEmpty: "暂无已保存方案",
			editorSchemeRemove: "删除方案",
			editorFilePath: "文件路径"
		};
		const en = {
			viewLabel: "Files",
			emptyWorkspace: "Empty workspace",
			settingsTitle: "X6 file explorer",
			settingsDescription: "Workspace root and conversation file-link behavior",
			settingsRoot: "Fallback root",
			settingsRootHint: "Used before a session cwd pin; opening the explorer pins to the session workspace when available",
			settingsOpenLinks: "Open conversation file links in editor",
			settingsOpenLinksHint: "Intercept local path links in conversation messages and open them in the file editor",
			expand: "Expand",
			collapse: "Collapse",
			expandAll: "Expand All",
			collapseAll: "Collapse All",
			readOnly: "Settings are read-only right now",
			newFile: "New file",
			newFolder: "New folder",
			refresh: "Refresh",
			rename: "Rename",
			delete: "Delete",
			promptNewFile: "New file name",
			promptNewFolder: "New folder name",
			promptRename: "Rename to",
			confirmDelete: "Delete \"{name}\"?",
			openInFileManager: "Reveal in file manager",
			revealPathInFileManager: "Reveal in File Manager",
			tabClose: "Close",
			tabCloseRight: "Close to the Right",
			tabCloseAll: "Close All",
			confirmCloseDirty: "Unsaved changes will be discarded. Close anyway?",
			editorEmpty: "Open a file from the explorer",
			editorSave: "Save",
			editorSource: "Source",
			editorPreview: "Preview",
			editorSaved: "Saved",
			editorTextareaMode: "Textarea mode",
			treeAriaLabel: "Workspace files",
			editorAppearance: "Theme",
			editorTheme: "Background",
			editorThemeDark: "Dark",
			editorThemeLight: "Light",
			editorThemeHighContrast: "High contrast",
			editorFontSize: "Font size",
			editorFontSmaller: "Decrease font size",
			editorFontLarger: "Increase font size",
			editorCustomColor: "Custom color",
			editorCustomColorHint: "Accepts #RGB / #RRGGBB / #RRGGBBAA",
			editorCustomColorInvalid: "Invalid color — use an HTML hex value",
			editorCustomColorClear: "Clear",
			editorScheme: "Schemes",
			editorSchemeSave: "Save current scheme",
			editorSchemeEmpty: "No saved schemes yet",
			editorSchemeRemove: "Remove scheme",
			editorFilePath: "File path"
		};
		const dictionaries = {
			zh,
			en
		};
		function explorerT(locale) {
			const table = locale.startsWith("zh") ? zh : en;
			return (key, vars) => {
				let text = table[key];
				if (vars !== void 0) for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, value);
				return text;
			};
		}
		//#endregion
		//#region lib/types/client/use-explorer-t.js
		/** Subscribe to active locale and return an explorer translate function. */
		/** Reactive `t` for file-explorer copy. */
		function useExplorerT(ctx) {
			return explorerT((0, react.useSyncExternalStore)((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active));
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/ui/x6-plugin-file-explorer/src/client/explorer/explorer.module.css.mjs
		const css$3 = ".MVg3xW_panel{background:var(--dsw-alias-bg-layer-2);min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;font-size:13px;display:flex;overflow:hidden}.MVg3xW_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);box-sizing:border-box;flex-shrink:0;justify-content:space-between;align-items:center;gap:8px;min-height:36px;padding:8px 10px;display:flex}.MVg3xW_workspaceName{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:600;overflow:hidden}.MVg3xW_toolbarActions{flex-shrink:0;align-items:center;gap:2px;display:flex}.MVg3xW_iconBtn{appearance:none;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:0;border-radius:4px;justify-content:center;align-items:center;width:26px;height:26px;padding:0;display:inline-flex}.MVg3xW_iconBtn:hover{background:var(--dsw-alias-bg-layer-3)}.MVg3xW_iconBtn:disabled{opacity:.45;cursor:default}.MVg3xW_toolIcon{width:16px;height:16px;display:block}.MVg3xW_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 8px}.MVg3xW_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.MVg3xW_toolBtn:disabled{opacity:.45;cursor:default}.MVg3xW_errorBanner{color:var(--dsw-alias-danger,#c44);background:var(--dsw-alias-bg-layer-3);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 10px}.MVg3xW_treeScroll{overscroll-behavior:contain;scrollbar-gutter:stable both-edges;flex:1;min-width:0;min-height:0;overflow:auto}.MVg3xW_treeScroll::-webkit-scrollbar{width:8px;height:8px}.MVg3xW_treeScroll::-webkit-scrollbar-thumb{background:var(--dsw-alias-scrollbar-bg-l2,color-mix(in srgb,var(--dsw-alias-label-primary)28%,transparent));border-radius:4px}.MVg3xW_treeScroll::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-scrollbar-hover-l2,color-mix(in srgb,var(--dsw-alias-label-primary)42%,transparent))}.MVg3xW_treeScroll::-webkit-scrollbar-corner{background:0 0}.MVg3xW_tree{vertical-align:top;box-sizing:border-box;cursor:pointer;min-width:100%;margin:0;padding:4px 0 12px;list-style:none;display:inline-block}.MVg3xW_tree>li,.MVg3xW_children>li{display:block}.MVg3xW_empty{color:var(--dsw-alias-label-secondary);cursor:default;padding:16px 12px}.MVg3xW_row{box-sizing:border-box;width:max-content;max-width:none;color:inherit;font:inherit;text-align:left;cursor:pointer;user-select:none;background:0 0;border:0;border-radius:4px;outline:none;align-items:center;gap:4px;padding-top:3px;padding-bottom:3px;padding-right:12px;display:flex;position:relative}.MVg3xW_row:hover{background:var(--dsw-alias-bg-layer-3)}.MVg3xW_row:focus,.MVg3xW_row:focus-visible{cursor:pointer;background:var(--dsw-alias-bg-layer-3);box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l1,var(--dsw-alias-label-dimmed))}.MVg3xW_rowSelected{background:color-mix(in srgb,var(--dsw-alias-label-primary)10%,var(--dsw-alias-bg-layer-3))}.MVg3xW_rowSelected:focus,.MVg3xW_rowSelected:focus-visible{background:color-mix(in srgb,var(--dsw-alias-label-primary)14%,var(--dsw-alias-bg-layer-3))}.MVg3xW_rowSelected:before{content:\"\";background:var(--dsw-alias-label-primary);border-radius:1px;width:2px;position:absolute;top:2px;bottom:2px;left:0}.MVg3xW_rowOpened:not(.MVg3xW_rowSelected){color:var(--dsw-alias-label-primary);font-weight:500}.MVg3xW_rowEditing{cursor:default;background:var(--dsw-alias-bg-layer-3)}.MVg3xW_chevron{opacity:.7;flex-shrink:0;width:14px;height:14px;display:block}.MVg3xW_chevronBtn{appearance:none;color:inherit;cursor:pointer;background:0 0;border:0;border-radius:4px;flex-shrink:0;justify-content:center;align-items:center;width:18px;height:18px;margin:0;padding:0;display:inline-flex}.MVg3xW_chevronBtn:hover{background:var(--dsw-alias-bg-layer-1)}.MVg3xW_chevronPlaceholder{flex-shrink:0;width:18px;height:18px}.MVg3xW_icon{opacity:.85;flex-shrink:0;width:14px;height:14px}.MVg3xW_label{white-space:nowrap;flex:none}.MVg3xW_inlineInput{border:1px solid var(--dsw-alias-border-l1,var(--dsw-alias-border-l2));background:var(--dsw-alias-bg-layer-1);width:12em;min-width:120px;height:22px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:4px;outline:none;flex:0 auto;margin:0;padding:1px 6px}.MVg3xW_inlineInput:focus{border-color:var(--dsw-alias-label-dimmed)}.MVg3xW_children{margin:0;padding:0;list-style:none}.MVg3xW_emptyChild{color:var(--dsw-alias-label-secondary);padding-top:2px;padding-bottom:2px;padding-right:8px;font-size:12px;list-style:none}.MVg3xW_contextMenu{z-index:1000;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:148px;box-shadow:0 8px 24px color-mix(in srgb,var(--dsw-alias-label-primary)12%,transparent);border-radius:8px;flex-direction:column;gap:2px;margin:0;padding:4px;display:flex;position:fixed}.MVg3xW_contextItem{appearance:none;color:var(--dsw-alias-label-primary);font:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:6px;padding:7px 10px;font-size:13px}.MVg3xW_contextItem:hover{background:var(--dsw-alias-bg-layer-3)}.MVg3xW_contextItem:disabled{opacity:.45;cursor:default}.MVg3xW_contextItem:disabled:hover{background:0 0}.MVg3xW_contextItemDanger{color:var(--dsw-alias-danger,#c44)}.MVg3xW_contextItemDanger:hover{background:color-mix(in srgb,var(--dsw-alias-danger,#c44)12%,var(--dsw-alias-bg-layer-3))}";
		const tagId$3 = "@x6_ai/x6-plugin-file-explorer/explorer.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/x6-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var explorer_module_css_default = {
			"chevron": "MVg3xW_chevron",
			"chevronBtn": "MVg3xW_chevronBtn",
			"chevronPlaceholder": "MVg3xW_chevronPlaceholder",
			"children": "MVg3xW_children",
			"contextItem": "MVg3xW_contextItem",
			"contextItemDanger": "MVg3xW_contextItemDanger",
			"contextMenu": "MVg3xW_contextMenu",
			"empty": "MVg3xW_empty",
			"emptyChild": "MVg3xW_emptyChild",
			"errorBanner": "MVg3xW_errorBanner",
			"icon": "MVg3xW_icon",
			"iconBtn": "MVg3xW_iconBtn",
			"inlineInput": "MVg3xW_inlineInput",
			"label": "MVg3xW_label",
			"panel": "MVg3xW_panel",
			"row": "MVg3xW_row",
			"rowEditing": "MVg3xW_rowEditing",
			"rowOpened": "MVg3xW_rowOpened",
			"rowSelected": "MVg3xW_rowSelected",
			"toolBtn": "MVg3xW_toolBtn",
			"toolIcon": "MVg3xW_toolIcon",
			"toolbar": "MVg3xW_toolbar",
			"toolbarActions": "MVg3xW_toolbarActions",
			"tree": "MVg3xW_tree",
			"treeScroll": "MVg3xW_treeScroll",
			"workspaceName": "MVg3xW_workspaceName"
		};
		//#endregion
		//#region lib/types/client/explorer/InlineNameInput.js
		/**
		* Shared basename sanitizer and inline name editor for the file tree.
		*/
		/** Reject empty / path-segment / traversal names; strip parent path if pasted. */
		function sanitizeBasename(raw) {
			const trimmed = raw.trim();
			if (trimmed === "") return null;
			const base = trimmed.replaceAll("\\", "/").split("/").filter(Boolean).pop() ?? "";
			if (base === "" || base === "." || base === "..") return null;
			if (base.includes("/") || base.includes("\\")) return null;
			return base;
		}
		function FolderIcon$1() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M1.5 3.5h5l1 1.5h7v8h-13z",
					opacity: "0.85"
				})
			});
		}
		function FileIcon$1() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M4 1.5h5.5L13 5v9.5H4z",
					opacity: "0.75"
				})
			});
		}
		/**
		* Tree row with a focused text field. Enter commits; Escape cancels;
		* blur commits when non-empty, otherwise cancels.
		*/
		function InlineNameInput(props) {
			const { depth, kind, initialValue, placeholder, ariaLabel, onCommit, onCancel } = props;
			const ref = (0, react.useRef)(null);
			const finished = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				const el = ref.current;
				if (el === null) return;
				el.focus();
				el.select();
			}, []);
			const finish = (fn) => {
				if (finished.current) return;
				finished.current = true;
				fn();
			};
			const tryCommit = (raw) => {
				const name = sanitizeBasename(raw);
				if (name === null) {
					finish(onCancel);
					return;
				}
				finish(() => onCommit(name));
			};
			const onKeyDown = (event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					event.stopPropagation();
					tryCommit(event.currentTarget.value);
					return;
				}
				if (event.key === "Escape") {
					event.preventDefault();
					event.stopPropagation();
					finish(onCancel);
				}
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: `${explorer_module_css_default.row} ${explorer_module_css_default.rowEditing}`,
				style: { paddingLeft: 8 + depth * 12 },
				"data-file-explorer-inline-edit": "",
				children: [
					(0, react_jsx_runtime.jsx)("span", { className: explorer_module_css_default.chevronPlaceholder }),
					kind === "dir" ? (0, react_jsx_runtime.jsx)(FolderIcon$1, {}) : (0, react_jsx_runtime.jsx)(FileIcon$1, {}),
					(0, react_jsx_runtime.jsx)("input", {
						ref,
						className: explorer_module_css_default.inlineInput,
						defaultValue: initialValue,
						placeholder,
						"aria-label": ariaLabel,
						spellCheck: false,
						onClick: (event) => event.stopPropagation(),
						onKeyDown,
						onBlur: (event) => {
							tryCommit(event.currentTarget.value);
						}
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/explorer/ToolbarIcons.js
		function IconShell(props) {
			return (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: explorer_module_css_default.iconBtn,
				title: props.title,
				"aria-label": props.title,
				onClick: props.onClick,
				children: props.children
			});
		}
		const svgProps = {
			className: explorer_module_css_default.toolIcon,
			viewBox: "0 0 16 16",
			fill: "none",
			"aria-hidden": true
		};
		/** Document with corner plus — new file. */
		function NewFileIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [
						(0, react_jsx_runtime.jsx)("path", {
							d: "M4 2.5h5.2L12 5.3V13.5H4V2.5Z",
							stroke: "currentColor",
							strokeWidth: "1.2"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M9 2.5V5.5H12",
							stroke: "currentColor",
							strokeWidth: "1.2"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M8 8v4M6 10h4",
							stroke: "currentColor",
							strokeWidth: "1.2",
							strokeLinecap: "round"
						})
					]
				})
			});
		}
		/** Folder with plus — new folder. */
		function NewFolderIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M9.5 7.8v3.2M7.9 9.4h3.2",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round"
					})]
				})
			});
		}
		/** Circular arrows — refresh. */
		function RefreshIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M13 8a5 5 0 1 1-1.4-3.4",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M13 3.2V6.5H9.7",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Nested chevrons — expand all. */
		function ExpandAllIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M3 4.5 8 9l5-4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M3 8.5 8 13l5-4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Nested chevrons up — collapse all. */
		function CollapseAllIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					...svgProps,
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M3 7.5 8 3l5 4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}), (0, react_jsx_runtime.jsx)("path", {
						d: "M3 11.5 8 7l5 4.5",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})]
				})
			});
		}
		/** Plain folder — reveal in OS file manager. */
		function RevealIconButton(props) {
			return (0, react_jsx_runtime.jsx)(IconShell, {
				title: props.title,
				onClick: props.onClick,
				children: (0, react_jsx_runtime.jsx)("svg", {
					...svgProps,
					children: (0, react_jsx_runtime.jsx)("path", {
						d: "M2 4.2h4.2l1.1 1.3H14v6.8H2V4.2Z",
						stroke: "currentColor",
						strokeWidth: "1.2",
						strokeLinejoin: "round"
					})
				})
			});
		}
		//#endregion
		//#region lib/types/client/explorer/ExplorerContextMenu.js
		/**
		* Floating context menu for explorer rows (rename / delete).
		*/
		/**
		* Fixed-position menu; closes on outside click, Escape, or item select.
		*/
		function ExplorerContextMenu(props) {
			const { x, y, items, onClose } = props;
			const rootRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				const onPointer = (event) => {
					const root = rootRef.current;
					if (root !== null && root.contains(event.target)) return;
					onClose();
				};
				const onKey = (event) => {
					if (event.key === "Escape") onClose();
				};
				const timer = window.setTimeout(() => {
					document.addEventListener("mousedown", onPointer, true);
					document.addEventListener("keydown", onKey, true);
				}, 0);
				return () => {
					window.clearTimeout(timer);
					document.removeEventListener("mousedown", onPointer, true);
					document.removeEventListener("keydown", onKey, true);
				};
			}, [onClose]);
			const maxX = typeof window !== "undefined" ? window.innerWidth - 8 : x;
			const maxY = typeof window !== "undefined" ? window.innerHeight - 8 : y;
			const left = Math.min(x, maxX - 160);
			const top = Math.min(y, maxY - 88);
			return (0, react_jsx_runtime.jsx)("div", {
				ref: rootRef,
				className: explorer_module_css_default.contextMenu,
				style: {
					left,
					top
				},
				role: "menu",
				"data-file-explorer-context-menu": "",
				children: items.map((item) => (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					role: "menuitem",
					disabled: item.disabled === true,
					className: item.danger === true ? `${explorer_module_css_default.contextItem} ${explorer_module_css_default.contextItemDanger}` : explorer_module_css_default.contextItem,
					onClick: () => {
						if (item.disabled === true) return;
						onClose();
						item.onSelect();
					},
					children: item.label
				}, item.id))
			});
		}
		//#endregion
		//#region lib/types/client/explorer/scroll-tree-row.js
		/**
		* Scroll a tree row into the explorer's dedicated scrollport (not the page).
		* Native scrollIntoView often fails here because ancestors use overflow:hidden.
		*/
		const SCROLL_PAD = 12;
		function scrollTreeRowIntoView(row) {
			const scroller = row.closest("[data-file-explorer-tree-scroll]");
			if (!(scroller instanceof HTMLElement)) return;
			const rowRect = row.getBoundingClientRect();
			const box = scroller.getBoundingClientRect();
			let nextLeft = scroller.scrollLeft;
			let nextTop = scroller.scrollTop;
			if (rowRect.right > box.right - SCROLL_PAD) nextLeft += rowRect.right - box.right + SCROLL_PAD;
			else if (rowRect.left < box.left + SCROLL_PAD) nextLeft -= box.left + SCROLL_PAD - rowRect.left;
			if (rowRect.bottom > box.bottom - SCROLL_PAD) nextTop += rowRect.bottom - box.bottom + SCROLL_PAD;
			else if (rowRect.top < box.top + SCROLL_PAD) nextTop -= box.top + SCROLL_PAD - rowRect.top;
			if (nextLeft !== scroller.scrollLeft || nextTop !== scroller.scrollTop) scroller.scrollTo({
				left: Math.max(0, nextLeft),
				top: Math.max(0, nextTop)
			});
		}
		//#endregion
		//#region lib/types/client/explorer/TreeNode.js
		/**
		* Single tree node with lazy children; rename/create via inline edit + context menu.
		*/
		function FolderIcon() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M1.5 3.5h5l1 1.5h7v8h-13z",
					opacity: "0.85"
				})
			});
		}
		function FileIcon() {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.icon,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M4 1.5h5.5L13 5v9.5H4z",
					opacity: "0.75"
				})
			});
		}
		function Chevron({ open }) {
			return (0, react_jsx_runtime.jsx)("svg", {
				className: explorer_module_css_default.chevron,
				viewBox: "0 0 16 16",
				"aria-hidden": "true",
				style: {
					transform: open ? "rotate(90deg)" : void 0,
					transition: "transform 0.12s"
				},
				children: (0, react_jsx_runtime.jsx)("path", {
					fill: "currentColor",
					d: "M6 3l5 5-5 5z"
				})
			});
		}
		function joinPath(parent, name) {
			return parent === "" ? name : `${parent}/${name}`;
		}
		function parentPath(path) {
			return path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
		}
		/**
		* Render one filesystem entry; directories expand lazily via `api.list`.
		*/
		function TreeNode(props) {
			const { entry, depth, api, t, activePath, selectedPath, onSelect, onOpenFile, onError, onTreeMutated, refreshToken, expandSignal, collapseSignal } = props;
			const [expanded, setExpanded] = (0, react.useState)(false);
			const [children, setChildren] = (0, react.useState)(null);
			const [loading, setLoading] = (0, react.useState)(false);
			const [menu, setMenu] = (0, react.useState)(null);
			const [renaming, setRenaming] = (0, react.useState)(false);
			const [childDraft, setChildDraft] = (0, react.useState)(null);
			const loadChildren = (0, react.useCallback)(async () => {
				setLoading(true);
				const result = await api.list(entry.path);
				setLoading(false);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				setChildren(result.value.entries);
			}, [
				api,
				entry.path,
				onError
			]);
			(0, react.useEffect)(() => {
				if (!expanded) return;
				loadChildren();
			}, [
				expanded,
				refreshToken,
				loadChildren
			]);
			(0, react.useEffect)(() => {
				if (expandSignal === 0 || entry.kind !== "dir") return;
				setExpanded(true);
			}, [expandSignal, entry.kind]);
			(0, react.useEffect)(() => {
				if (collapseSignal === 0 || entry.kind !== "dir") return;
				setExpanded(false);
			}, [collapseSignal, entry.kind]);
			const toggleExpand = () => {
				if (entry.kind !== "dir") return;
				setExpanded((v) => !v);
			};
			const onRowClick = () => {
				if (renaming) return;
				onSelect(entry.path);
				if (entry.kind === "dir") {
					toggleExpand();
					return;
				}
				onOpenFile(entry.path);
			};
			const commitRename = async (name) => {
				setRenaming(false);
				if (name === entry.name) return;
				const to = joinPath(parentPath(entry.path), name);
				const result = await api.rename(entry.path, to);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onSelect(to);
				onTreeMutated();
			};
			const commitChildCreate = async (kind, name) => {
				setChildDraft(null);
				const path = joinPath(entry.path, name);
				if (kind === "file") {
					const result = await api.write(path, "");
					if (!result.ok) {
						onError(result.error.message);
						return;
					}
					onTreeMutated();
					onSelect(path);
					onOpenFile(path);
					return;
				}
				const result = await api.mkdir(path);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onSelect(path);
				onTreeMutated();
			};
			const startChildDraft = (kind) => {
				setExpanded(true);
				setChildDraft(kind);
			};
			const remove = async () => {
				if (!window.confirm(t("confirmDelete", { name: entry.name }))) return;
				const result = await api.unlink(entry.path);
				if (!result.ok) {
					onError(result.error.message);
					return;
				}
				onTreeMutated();
			};
			const revealInFileManager = async () => {
				const result = await api.revealPath(entry.path);
				if (!result.ok) onError(result.error.message);
			};
			const selected = entry.path === selectedPath;
			const opened = entry.path === activePath;
			const rowRef = (0, react.useRef)(null);
			const rowClass = [
				explorer_module_css_default.row,
				selected ? explorer_module_css_default.rowSelected : "",
				opened && !selected ? explorer_module_css_default.rowOpened : ""
			].filter(Boolean).join(" ");
			(0, react.useEffect)(() => {
				if (!selected) return;
				const row = rowRef.current;
				if (row === null) return;
				const id = window.requestAnimationFrame(() => {
					scrollTreeRowIntoView(row);
				});
				return () => window.cancelAnimationFrame(id);
			}, [selected, expanded]);
			const menuItems = entry.kind === "dir" ? [
				{
					id: "expand-toggle",
					label: expanded ? t("collapse") : t("expand"),
					onSelect: () => {
						toggleExpand();
					}
				},
				{
					id: "reveal",
					label: t("revealPathInFileManager"),
					onSelect: () => {
						revealInFileManager();
					}
				},
				{
					id: "new-file",
					label: t("newFile"),
					onSelect: () => {
						startChildDraft("file");
					}
				},
				{
					id: "new-folder",
					label: t("newFolder"),
					onSelect: () => {
						startChildDraft("dir");
					}
				},
				{
					id: "rename",
					label: t("rename"),
					onSelect: () => {
						setRenaming(true);
					}
				},
				{
					id: "delete",
					label: t("delete"),
					danger: true,
					onSelect: () => {
						remove();
					}
				}
			] : [
				{
					id: "reveal",
					label: t("revealPathInFileManager"),
					onSelect: () => {
						revealInFileManager();
					}
				},
				{
					id: "rename",
					label: t("rename"),
					onSelect: () => {
						setRenaming(true);
					}
				},
				{
					id: "delete",
					label: t("delete"),
					danger: true,
					onSelect: () => {
						remove();
					}
				}
			];
			return (0, react_jsx_runtime.jsxs)("li", { children: [
				renaming ? (0, react_jsx_runtime.jsx)(InlineNameInput, {
					depth,
					kind: entry.kind,
					initialValue: entry.name,
					placeholder: t("promptRename"),
					ariaLabel: t("rename"),
					onCancel: () => setRenaming(false),
					onCommit: (name) => {
						commitRename(name);
					}
				}) : (0, react_jsx_runtime.jsxs)("div", {
					ref: rowRef,
					className: rowClass,
					style: { paddingLeft: 8 + depth * 12 },
					title: entry.path || entry.name,
					role: "treeitem",
					"aria-selected": selected,
					"aria-expanded": entry.kind === "dir" ? expanded : void 0,
					onClick: onRowClick,
					onContextMenu: (event) => {
						event.preventDefault();
						event.stopPropagation();
						onSelect(entry.path);
						setMenu({
							x: event.clientX,
							y: event.clientY
						});
					},
					onKeyDown: (event) => {
						if (entry.kind === "dir" && event.key === "ArrowRight") {
							event.preventDefault();
							onSelect(entry.path);
							setExpanded(true);
							return;
						}
						if (entry.kind === "dir" && event.key === "ArrowLeft") {
							event.preventDefault();
							onSelect(entry.path);
							setExpanded(false);
							return;
						}
						if (event.key === "Enter" || event.key === " ") {
							event.preventDefault();
							onRowClick();
						}
						if (event.key === "F2") {
							event.preventDefault();
							onSelect(entry.path);
							setRenaming(true);
						}
					},
					tabIndex: 0,
					children: [
						entry.kind === "dir" ? (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: explorer_module_css_default.chevronBtn,
							"aria-label": expanded ? t("collapse") : t("expand"),
							tabIndex: -1,
							onClick: (event) => {
								event.preventDefault();
								event.stopPropagation();
								onSelect(entry.path);
								toggleExpand();
							},
							children: (0, react_jsx_runtime.jsx)(Chevron, { open: expanded })
						}) : (0, react_jsx_runtime.jsx)("span", { className: explorer_module_css_default.chevronPlaceholder }),
						entry.kind === "dir" ? (0, react_jsx_runtime.jsx)(FolderIcon, {}) : (0, react_jsx_runtime.jsx)(FileIcon, {}),
						(0, react_jsx_runtime.jsxs)("span", {
							className: explorer_module_css_default.label,
							children: [entry.name, loading ? "…" : ""]
						})
					]
				}),
				menu !== null ? (0, react_jsx_runtime.jsx)(ExplorerContextMenu, {
					x: menu.x,
					y: menu.y,
					onClose: () => setMenu(null),
					items: menuItems
				}) : null,
				entry.kind === "dir" && expanded ? (0, react_jsx_runtime.jsxs)("ul", {
					className: explorer_module_css_default.children,
					role: "group",
					children: [
						childDraft !== null ? (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)(InlineNameInput, {
							depth: depth + 1,
							kind: childDraft,
							initialValue: "",
							placeholder: childDraft === "file" ? t("promptNewFile") : t("promptNewFolder"),
							ariaLabel: childDraft === "file" ? t("newFile") : t("newFolder"),
							onCancel: () => setChildDraft(null),
							onCommit: (name) => {
								commitChildCreate(childDraft, name);
							}
						}) }, `draft-${childDraft}`) : null,
						children !== null ? children.map((child) => (0, react_jsx_runtime.jsx)(TreeNode, {
							entry: child,
							depth: depth + 1,
							api,
							t,
							activePath,
							selectedPath,
							onSelect,
							onOpenFile,
							onError,
							onTreeMutated,
							refreshToken,
							expandSignal,
							collapseSignal
						}, child.path)) : null,
						children !== null && children.length === 0 && childDraft === null ? (0, react_jsx_runtime.jsx)("li", {
							className: explorer_module_css_default.emptyChild,
							style: { paddingLeft: 8 + (depth + 1) * 12 },
							children: t("emptyWorkspace")
						}) : null
					]
				}) : null
			] });
		}
		//#endregion
		//#region lib/types/client/explorer/ExplorerPanel.js
		/**
		* Sidebar explorer panel: workspace header + icon actions + root listing.
		*/
		var PanelBoundary = class extends react.Component {
			state = { message: null };
			static getDerivedStateFromError(error) {
				return { message: error.message };
			}
			componentDidCatch(error, info) {
				console.error("[file-explorer] panel crash", error, info);
			}
			render() {
				if (this.state.message !== null) return (0, react_jsx_runtime.jsx)("div", {
					className: explorer_module_css_default.errorBanner,
					children: this.state.message
				});
				return this.props.children;
			}
		};
		/** Basename for display; browser bundle may not have node:path — keep a fallback. */
		function workspaceLabel(root) {
			const normalized = root.replaceAll("\\", "/").replace(/\/+$/, "");
			return (normalized.includes("/") ? normalized.slice(normalized.lastIndexOf("/") + 1) : normalized) || root || "workspace";
		}
		/**
		* Root listing with create-file / create-dir actions.
		*/
		function ExplorerPanel(props) {
			return (0, react_jsx_runtime.jsx)(PanelBoundary, { children: (0, react_jsx_runtime.jsx)(ExplorerPanelInner, { ...props }) });
		}
		function ExplorerPanelInner(props) {
			const { ctx, api, tabs, onOpenFile } = props;
			const t = useExplorerT(ctx);
			const activePath = (0, react.useSyncExternalStore)(tabs.subscribe, () => tabs.getSnapshot().activePath);
			const [entries, setEntries] = (0, react.useState)([]);
			const [error, setError] = (0, react.useState)(null);
			const [refreshToken, setRefreshToken] = (0, react.useState)(0);
			const [expandSignal, setExpandSignal] = (0, react.useState)(0);
			const [collapseSignal, setCollapseSignal] = (0, react.useState)(0);
			const [rootDraft, setRootDraft] = (0, react.useState)(null);
			const [selectedPath, setSelectedPath] = (0, react.useState)(null);
			const [rootPath, setRootPath] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				if (activePath !== null) setSelectedPath(activePath);
			}, [activePath]);
			const reload = (0, react.useCallback)(async () => {
				const [listResult, rootResult] = await Promise.all([api.list(""), api.getRoot()]);
				if (rootResult.ok) setRootPath(rootResult.value.root);
				if (!listResult.ok) {
					setError(listResult.error.message);
					return;
				}
				setError(null);
				setEntries(listResult.value.entries);
			}, [api]);
			(0, react.useEffect)(() => {
				reload();
			}, [reload, refreshToken]);
			(0, react.useEffect)(() => subscribeRootPinned(() => {
				setRefreshToken((n) => n + 1);
			}), []);
			const bump = () => {
				setRefreshToken((n) => n + 1);
			};
			const commitRootCreate = async (kind, name) => {
				setRootDraft(null);
				const path = name;
				if (kind === "file") {
					const result = await api.write(path, "");
					if (!result.ok) {
						setError(result.error.message);
						return;
					}
					bump();
					setSelectedPath(path);
					onOpenFile(path);
					return;
				}
				const result = await api.mkdir(path);
				if (!result.ok) {
					setError(result.error.message);
					return;
				}
				bump();
				setSelectedPath(path);
			};
			const revealRoot = async () => {
				const result = await api.revealRoot();
				if (!result.ok) setError(result.error.message);
			};
			const title = workspaceLabel(rootPath);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: explorer_module_css_default.panel,
				"data-file-explorer-panel": "",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: explorer_module_css_default.toolbar,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: explorer_module_css_default.workspaceName,
							title: rootPath || void 0,
							children: title
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: explorer_module_css_default.toolbarActions,
							children: [
								(0, react_jsx_runtime.jsx)(NewFileIconButton, {
									title: t("newFile"),
									onClick: () => setRootDraft("file")
								}),
								(0, react_jsx_runtime.jsx)(NewFolderIconButton, {
									title: t("newFolder"),
									onClick: () => setRootDraft("dir")
								}),
								(0, react_jsx_runtime.jsx)(ExpandAllIconButton, {
									title: t("expandAll"),
									onClick: () => setExpandSignal((n) => n + 1)
								}),
								(0, react_jsx_runtime.jsx)(CollapseAllIconButton, {
									title: t("collapseAll"),
									onClick: () => setCollapseSignal((n) => n + 1)
								}),
								(0, react_jsx_runtime.jsx)(RefreshIconButton, {
									title: t("refresh"),
									onClick: () => bump()
								}),
								(0, react_jsx_runtime.jsx)(RevealIconButton, {
									title: t("openInFileManager"),
									onClick: () => void revealRoot()
								})
							]
						})]
					}),
					error !== null ? (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.errorBanner,
						children: error
					}) : null,
					entries.length === 0 && rootDraft === null ? (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.empty,
						children: t("emptyWorkspace")
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: explorer_module_css_default.treeScroll,
						"data-file-explorer-tree-scroll": "",
						children: (0, react_jsx_runtime.jsxs)("ul", {
							className: explorer_module_css_default.tree,
							role: "tree",
							children: [rootDraft !== null ? (0, react_jsx_runtime.jsx)("li", { children: (0, react_jsx_runtime.jsx)(InlineNameInput, {
								depth: 0,
								kind: rootDraft,
								initialValue: "",
								placeholder: rootDraft === "file" ? t("promptNewFile") : t("promptNewFolder"),
								ariaLabel: rootDraft === "file" ? t("newFile") : t("newFolder"),
								onCancel: () => setRootDraft(null),
								onCommit: (name) => {
									commitRootCreate(rootDraft, name);
								}
							}) }, `draft-${rootDraft}`) : null, entries.map((entry) => (0, react_jsx_runtime.jsx)(TreeNode, {
								entry,
								depth: 0,
								api,
								t,
								activePath,
								selectedPath,
								onSelect: setSelectedPath,
								onOpenFile,
								onError: setError,
								onTreeMutated: bump,
								refreshToken,
								expandSignal,
								collapseSignal
							}, entry.path))]
						})
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/editor/monaco-loader.js
		/**
		* Load Monaco from jsDelivr; callers fall back to textarea on failure.
		*/
		const MONACO_CDN = "https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs";
		const LOAD_TIMEOUT_MS = 12e3;
		let loading = null;
		/**
		* Ensure Monaco AMD loader + editor are available.
		*/
		function loadMonaco() {
			if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("monaco requires a browser"));
			if (window.monaco !== void 0) return Promise.resolve(window.monaco);
			if (loading !== null) return loading;
			loading = new Promise((resolve, reject) => {
				const timer = window.setTimeout(() => {
					loading = null;
					reject(/* @__PURE__ */ new Error("monaco load timed out"));
				}, LOAD_TIMEOUT_MS);
				const finish = (monaco) => {
					window.clearTimeout(timer);
					window.monaco = monaco;
					resolve(monaco);
				};
				const startRequire = () => {
					if (window.require === void 0) {
						loading = null;
						window.clearTimeout(timer);
						reject(/* @__PURE__ */ new Error("monaco AMD loader missing"));
						return;
					}
					window.require.config({ paths: { vs: MONACO_CDN } });
					window.require(["vs/editor/editor.main"], (monaco) => {
						finish(monaco);
					});
				};
				if (window.require !== void 0) {
					startRequire();
					return;
				}
				const script = document.createElement("script");
				script.src = `${MONACO_CDN}/loader.js`;
				script.async = true;
				script.onload = () => startRequire();
				script.onerror = () => {
					loading = null;
					window.clearTimeout(timer);
					reject(/* @__PURE__ */ new Error("monaco loader script failed"));
				};
				document.head.appendChild(script);
			}).catch((error) => {
				loading = null;
				throw error;
			});
			return loading;
		}
		/** Map a relative path to a Monaco language id. */
		function languageForPath(path) {
			const lower = path.toLowerCase();
			if (lower.endsWith(".ts") || lower.endsWith(".tsx")) return "typescript";
			if (lower.endsWith(".js") || lower.endsWith(".jsx") || lower.endsWith(".mjs")) return "javascript";
			if (lower.endsWith(".json")) return "json";
			if (lower.endsWith(".md") || lower.endsWith(".markdown")) return "markdown";
			if (lower.endsWith(".css") || lower.endsWith(".scss")) return "css";
			if (lower.endsWith(".html") || lower.endsWith(".htm")) return "html";
			if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "yaml";
			if (lower.endsWith(".py")) return "python";
			if (lower.endsWith(".go")) return "go";
			if (lower.endsWith(".rs")) return "rust";
			if (lower.endsWith(".sh") || lower.endsWith(".bash")) return "shell";
			return "plaintext";
		}
		//#endregion
		//#region lib/types/client/editor/appearance.js
		/**
		* Persisted Monaco / textarea appearance (theme, optional custom bg, font size, schemes).
		* Intentionally not named themeStore — keep clear of upstream naming.
		*/
		const STORAGE_KEY = "x6-file-explorer:editor-appearance";
		const SCHEMES_KEY = "x6-file-explorer:editor-appearance-schemes";
		const FONT_MIN = 11;
		const FONT_MAX = 24;
		const FONT_DEFAULT = 13;
		const SCHEMES_MAX = 12;
		const CUSTOM_THEME_ID = "x6-file-explorer-custom";
		const THEMES = [
			"vs-dark",
			"vs",
			"hc-black"
		];
		const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
		function clampFont(size) {
			if (!Number.isFinite(size)) return FONT_DEFAULT;
			return Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(size)));
		}
		function parseTheme(raw) {
			return THEMES.includes(raw) ? raw : "vs-dark";
		}
		/** Normalize and validate an HTML hex color; returns null when invalid. */
		function normalizeHexColor(raw) {
			const trimmed = raw.trim();
			if (!HEX_RE.test(trimmed)) return null;
			if (trimmed.length === 4) {
				const r = trimmed[1];
				const g = trimmed[2];
				const b = trimmed[3];
				return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
			}
			return trimmed.toLowerCase();
		}
		/** Color input (`#rrggbb`) value derived from a stored custom color. */
		function hexForColorInput(custom, theme) {
			if (custom !== null) {
				if (custom.length === 9) return custom.slice(0, 7);
				return custom;
			}
			if (theme === "vs") return "#ffffff";
			if (theme === "hc-black") return "#000000";
			return "#1e1e1e";
		}
		function parseCustomBackground(raw) {
			if (typeof raw !== "string") return null;
			return normalizeHexColor(raw);
		}
		function newSchemeId() {
			return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
		}
		function parseSchemes(raw) {
			if (!Array.isArray(raw)) return [];
			const out = [];
			for (const item of raw) {
				if (item === null || typeof item !== "object") continue;
				const row = item;
				const background = typeof row.background === "string" ? normalizeHexColor(row.background) : null;
				if (background === null) continue;
				const fontSize = clampFont(typeof row.fontSize === "number" ? row.fontSize : FONT_DEFAULT);
				const id = typeof row.id === "string" && row.id.length > 0 ? row.id : newSchemeId();
				out.push({
					id,
					background,
					fontSize
				});
				if (out.length >= SCHEMES_MAX) break;
			}
			return out;
		}
		function defaults() {
			return {
				theme: "vs-dark",
				customBackground: null,
				fontSize: FONT_DEFAULT,
				schemes: []
			};
		}
		function readStoredAppearance() {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw === null) return {
					theme: "vs-dark",
					customBackground: null,
					fontSize: FONT_DEFAULT
				};
				const parsed = JSON.parse(raw);
				return {
					theme: parseTheme(parsed.theme),
					customBackground: parseCustomBackground(parsed.customBackground),
					fontSize: clampFont(typeof parsed.fontSize === "number" ? parsed.fontSize : FONT_DEFAULT)
				};
			} catch {
				return {
					theme: "vs-dark",
					customBackground: null,
					fontSize: FONT_DEFAULT
				};
			}
		}
		function readStoredSchemes() {
			try {
				const raw = window.localStorage.getItem(SCHEMES_KEY);
				if (raw === null) return [];
				return parseSchemes(JSON.parse(raw));
			} catch {
				return [];
			}
		}
		/**
		* Mutable appearance prefs with subscribe semantics for React.
		* `getSnapshot` MUST return a stable reference between mutations.
		*/
		var EditorAppearanceStore = class {
			#theme = "vs-dark";
			#customBackground = null;
			#fontSize = FONT_DEFAULT;
			#schemes = [];
			#hydrated = false;
			#snapshot = defaults();
			#listeners = /* @__PURE__ */ new Set();
			getSnapshot = () => this.#snapshot;
			subscribe = (listener) => {
				this.#listeners.add(listener);
				return () => {
					this.#listeners.delete(listener);
				};
			};
			/** Load from localStorage once on the client. */
			hydrate() {
				if (this.#hydrated) return;
				this.#hydrated = true;
				if (typeof window === "undefined") return;
				const next = readStoredAppearance();
				this.#theme = next.theme;
				this.#customBackground = next.customBackground;
				this.#fontSize = next.fontSize;
				this.#schemes = readStoredSchemes();
				this.#refreshSnapshot();
				this.#emit();
			}
			setTheme(theme) {
				if (this.#theme === theme && this.#customBackground === null) return;
				this.#theme = theme;
				this.#customBackground = null;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
			}
			/**
			* Set or clear a custom background hex.
			* @returns whether the value was accepted (invalid hex ignored when non-empty).
			*/
			setCustomBackground(raw) {
				if (raw === null || raw.trim() === "") {
					if (this.#customBackground === null) return true;
					this.#customBackground = null;
					this.#refreshSnapshot();
					this.#persistAppearance();
					this.#emit();
					return true;
				}
				const next = normalizeHexColor(raw);
				if (next === null) return false;
				if (this.#customBackground === next) return true;
				this.#customBackground = next;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
				return true;
			}
			setFontSize(size) {
				const next = clampFont(size);
				if (this.#fontSize === next) return;
				this.#fontSize = next;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
			}
			bumpFont(delta) {
				this.setFontSize(this.#fontSize + delta);
			}
			/**
			* Persist current color + font as a named scheme.
			* @param backgroundOverride optional hex (e.g. menu draft) instead of current store color.
			* @returns whether a scheme was written.
			*/
			saveScheme(backgroundOverride) {
				const background = (backgroundOverride !== void 0 ? normalizeHexColor(backgroundOverride) : null) ?? this.#customBackground ?? hexForColorInput(null, this.#theme);
				const fontSize = this.#fontSize;
				const existing = this.#schemes.findIndex((s) => s.background === background && s.fontSize === fontSize);
				if (existing >= 0) {
					const hit = this.#schemes[existing];
					this.#schemes = [hit, ...this.#schemes.filter((_, i) => i !== existing)];
					this.#refreshSnapshot();
					this.#persistSchemes();
					this.#emit();
					return true;
				}
				const next = {
					id: newSchemeId(),
					background,
					fontSize
				};
				this.#schemes = [next, ...this.#schemes].slice(0, SCHEMES_MAX);
				this.#refreshSnapshot();
				this.#persistSchemes();
				this.#emit();
				return true;
			}
			/** Apply a saved scheme (color + font). */
			applyScheme(id) {
				const scheme = this.#schemes.find((s) => s.id === id);
				if (scheme === void 0) return false;
				this.#customBackground = scheme.background;
				this.#fontSize = scheme.fontSize;
				this.#refreshSnapshot();
				this.#persistAppearance();
				this.#emit();
				return true;
			}
			removeScheme(id) {
				const next = this.#schemes.filter((s) => s.id !== id);
				if (next.length === this.#schemes.length) return;
				this.#schemes = next;
				this.#refreshSnapshot();
				this.#persistSchemes();
				this.#emit();
			}
			#refreshSnapshot() {
				this.#snapshot = {
					theme: this.#theme,
					customBackground: this.#customBackground,
					fontSize: this.#fontSize,
					schemes: this.#schemes
				};
			}
			#persistAppearance() {
				if (typeof window === "undefined") return;
				try {
					window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
						theme: this.#theme,
						customBackground: this.#customBackground,
						fontSize: this.#fontSize
					}));
				} catch {}
			}
			#persistSchemes() {
				if (typeof window === "undefined") return;
				try {
					window.localStorage.setItem(SCHEMES_KEY, JSON.stringify(this.#schemes));
				} catch {}
			}
			#emit() {
				for (const listener of this.#listeners) listener();
			}
		};
		const EDITOR_CUSTOM_THEME_ID = CUSTOM_THEME_ID;
		//#endregion
		//#region lib/types/client/editor/apply-monaco-appearance.js
		/**
		* Apply appearance prefs to a loaded Monaco namespace (theme + optional custom bg).
		*/
		/**
		* Register / select Monaco theme for the current appearance snapshot.
		*/
		function applyMonacoAppearance(monaco, appearance) {
			const custom = appearance.customBackground;
			if (custom === null) {
				monaco.editor.setTheme(appearance.theme);
				return;
			}
			const base = appearance.theme === "vs" ? "vs" : appearance.theme === "hc-black" ? "hc-black" : "vs-dark";
			monaco.editor.defineTheme(EDITOR_CUSTOM_THEME_ID, {
				base,
				inherit: true,
				rules: [],
				colors: {
					"editor.background": custom,
					"editorGutter.background": custom,
					"editorLineNumber.foreground": base === "vs" ? "#237893" : "#858585"
				}
			});
			monaco.editor.setTheme(EDITOR_CUSTOM_THEME_ID);
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/ui/x6-plugin-file-explorer/src/client/editor/editor.module.css.mjs
		const css$2 = ".Pz_aRq_surface{background:var(--dsw-alias-bg-layer-1);height:100%;min-height:0;color:var(--dsw-alias-label-primary);flex-direction:column;display:flex}.Pz_aRq_tabs{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;align-items:stretch;gap:2px;padding:0 8px;display:flex;overflow-x:auto}.Pz_aRq_tab{color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;white-space:nowrap;background:0 0;border:0;border-bottom:2px solid #0000;align-items:center;gap:6px;padding:8px 10px;font-size:13px;display:flex}.Pz_aRq_tabActive{color:var(--dsw-alias-label-primary);border-bottom-color:var(--dsw-alias-brand-primary)}.Pz_aRq_dirtyMark{color:var(--dsw-alias-brand-primary)}.Pz_aRq_closeBtn{appearance:none;color:inherit;font:inherit;cursor:pointer;opacity:.6;background:0 0;border:0;border-radius:4px;padding:2px 4px;font-size:12px;line-height:1}.Pz_aRq_closeBtn:hover{opacity:1;background:var(--dsw-alias-bg-layer-3)}.Pz_aRq_toolbar{border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;align-items:center;gap:8px;padding:6px 10px;display:flex}.Pz_aRq_toolBtn{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:6px;padding:4px 10px;font-size:12px}.Pz_aRq_toolBtn:hover{border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_toolBtnActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.Pz_aRq_status{color:var(--dsw-alias-label-secondary);margin-left:auto;font-size:12px}.Pz_aRq_pathBar{border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);white-space:nowrap;text-overflow:ellipsis;user-select:text;flex-shrink:0;padding:4px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px;line-height:1.4;overflow:hidden}.Pz_aRq_toolbarEnd{flex-shrink:0;align-items:center;display:flex;position:relative}.Pz_aRq_appearanceMenu{z-index:20;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);min-width:220px;box-shadow:0 10px 28px color-mix(in srgb,var(--dsw-alias-label-primary)14%,transparent);border-radius:10px;flex-direction:column;gap:12px;padding:10px;display:flex;position:absolute;top:calc(100% + 6px);right:0}.Pz_aRq_appearanceSection{flex-direction:column;gap:6px;display:flex}.Pz_aRq_appearanceLabel{color:var(--dsw-alias-label-secondary);font-size:12px}.Pz_aRq_appearanceThemeRow{flex-wrap:wrap;gap:6px;display:flex}.Pz_aRq_appearanceChip{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;font:inherit;cursor:pointer;border-radius:999px;padding:4px 10px;font-size:12px}.Pz_aRq_appearanceChip:hover{border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_appearanceChipActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.Pz_aRq_appearanceFontRow{align-items:center;gap:8px;display:flex}.Pz_aRq_appearanceStep{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;min-width:36px;height:28px;font:inherit;cursor:pointer;border-radius:6px;padding:0 8px;font-size:12px}.Pz_aRq_appearanceStep:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_appearanceStep:disabled{opacity:.45;cursor:default}.Pz_aRq_appearanceFontValue{text-align:center;font-variant-numeric:tabular-nums;min-width:48px;font-size:13px}.Pz_aRq_appearanceColorRow{align-items:center;gap:6px;display:flex}.Pz_aRq_appearanceColorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:6px;flex-shrink:0;width:28px;height:28px;padding:0}.Pz_aRq_appearanceHexInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;height:28px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:6px;outline:none;flex:1;padding:0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:12px}.Pz_aRq_appearanceHexInput:focus{border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_appearanceHexInvalid{border-color:var(--dsw-alias-danger,#c44)}.Pz_aRq_appearanceHint{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.35}.Pz_aRq_appearanceSaveScheme{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);color:inherit;height:28px;font:inherit;cursor:pointer;border-radius:6px;align-self:flex-start;padding:0 10px;font-size:12px}.Pz_aRq_appearanceSaveScheme:hover{border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_appearanceSchemeList{flex-direction:column;gap:4px;max-height:140px;margin:0;padding:0;list-style:none;display:flex;overflow-y:auto}.Pz_aRq_appearanceSchemeItem{align-items:center;gap:4px;display:flex}.Pz_aRq_appearanceSchemeApply{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);min-width:0;color:inherit;height:28px;font:inherit;cursor:pointer;text-align:left;border-radius:6px;flex:1;align-items:center;gap:8px;padding:0 8px;font-size:12px;display:flex}.Pz_aRq_appearanceSchemeApply:hover{border-color:var(--dsw-alias-label-dimmed)}.Pz_aRq_appearanceSchemeApplyActive{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-brand-primary)}.Pz_aRq_appearanceSchemeSwatch{border:1px solid var(--dsw-alias-border-l2);border-radius:3px;flex-shrink:0;width:14px;height:14px}.Pz_aRq_appearanceSchemeMeta{text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:11px;overflow:hidden}.Pz_aRq_appearanceSchemeRemove{appearance:none;color:var(--dsw-alias-label-secondary);width:28px;height:28px;font:inherit;cursor:pointer;background:0 0;border:0;border-radius:6px;flex-shrink:0;font-size:16px;line-height:1}.Pz_aRq_appearanceSchemeRemove:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-3)}.Pz_aRq_body{flex:1;min-height:0;position:relative}.Pz_aRq_textarea{resize:none;background:var(--dsw-alias-bg-layer-1);width:100%;height:100%;color:var(--dsw-alias-label-primary);box-sizing:border-box;border:0;outline:none;padding:12px 14px;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace}.Pz_aRq_monacoHost{width:100%;height:100%}.Pz_aRq_preview{box-sizing:border-box;height:100%;padding:16px 20px;line-height:1.55;overflow:auto}.Pz_aRq_preview h1,.Pz_aRq_preview h2,.Pz_aRq_preview h3{margin:.8em 0 .4em}.Pz_aRq_preview pre{background:var(--dsw-alias-bg-layer-3);border-radius:8px;padding:10px 12px;overflow:auto}.Pz_aRq_preview code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.92em}.Pz_aRq_empty{height:100%;color:var(--dsw-alias-label-secondary);place-items:center;font-size:14px;display:grid}.Pz_aRq_errorBanner{color:var(--dsw-alias-danger,#c44);border-bottom:1px solid var(--dsw-alias-border-l2);flex-shrink:0;padding:6px 12px}";
		const tagId$2 = "@x6_ai/x6-plugin-file-explorer/editor.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/x6-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var editor_module_css_default = {
			"appearanceChip": "Pz_aRq_appearanceChip",
			"appearanceChipActive": "Pz_aRq_appearanceChipActive",
			"appearanceColorRow": "Pz_aRq_appearanceColorRow",
			"appearanceColorSwatch": "Pz_aRq_appearanceColorSwatch",
			"appearanceFontRow": "Pz_aRq_appearanceFontRow",
			"appearanceFontValue": "Pz_aRq_appearanceFontValue",
			"appearanceHexInput": "Pz_aRq_appearanceHexInput",
			"appearanceHexInvalid": "Pz_aRq_appearanceHexInvalid",
			"appearanceHint": "Pz_aRq_appearanceHint",
			"appearanceLabel": "Pz_aRq_appearanceLabel",
			"appearanceMenu": "Pz_aRq_appearanceMenu",
			"appearanceSaveScheme": "Pz_aRq_appearanceSaveScheme",
			"appearanceSchemeApply": "Pz_aRq_appearanceSchemeApply",
			"appearanceSchemeApplyActive": "Pz_aRq_appearanceSchemeApplyActive",
			"appearanceSchemeItem": "Pz_aRq_appearanceSchemeItem",
			"appearanceSchemeList": "Pz_aRq_appearanceSchemeList",
			"appearanceSchemeMeta": "Pz_aRq_appearanceSchemeMeta",
			"appearanceSchemeRemove": "Pz_aRq_appearanceSchemeRemove",
			"appearanceSchemeSwatch": "Pz_aRq_appearanceSchemeSwatch",
			"appearanceSection": "Pz_aRq_appearanceSection",
			"appearanceStep": "Pz_aRq_appearanceStep",
			"appearanceThemeRow": "Pz_aRq_appearanceThemeRow",
			"body": "Pz_aRq_body",
			"closeBtn": "Pz_aRq_closeBtn",
			"dirtyMark": "Pz_aRq_dirtyMark",
			"empty": "Pz_aRq_empty",
			"errorBanner": "Pz_aRq_errorBanner",
			"monacoHost": "Pz_aRq_monacoHost",
			"pathBar": "Pz_aRq_pathBar",
			"preview": "Pz_aRq_preview",
			"status": "Pz_aRq_status",
			"surface": "Pz_aRq_surface",
			"tab": "Pz_aRq_tab",
			"tabActive": "Pz_aRq_tabActive",
			"tabs": "Pz_aRq_tabs",
			"textarea": "Pz_aRq_textarea",
			"toolBtn": "Pz_aRq_toolBtn",
			"toolBtnActive": "Pz_aRq_toolBtnActive",
			"toolbar": "Pz_aRq_toolbar",
			"toolbarEnd": "Pz_aRq_toolbarEnd"
		};
		//#endregion
		//#region lib/types/client/editor/AppearanceMenu.js
		/**
		* Popover for Monaco theme + custom hex background + font size + saved schemes.
		*/
		const THEME_OPTIONS = [
			{
				id: "vs-dark",
				labelKey: "editorThemeDark"
			},
			{
				id: "vs",
				labelKey: "editorThemeLight"
			},
			{
				id: "hc-black",
				labelKey: "editorThemeHighContrast"
			}
		];
		/**
		* Floating panel: preset themes, custom HTML hex, font size, saved schemes.
		*/
		function AppearanceMenu(props) {
			const { t, appearance, store, onClose } = props;
			const rootRef = (0, react.useRef)(null);
			const [hexDraft, setHexDraft] = (0, react.useState)(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
			const [hexInvalid, setHexInvalid] = (0, react.useState)(false);
			(0, react.useEffect)(() => {
				setHexDraft(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
				setHexInvalid(false);
			}, [appearance.customBackground, appearance.theme]);
			(0, react.useEffect)(() => {
				const onPointer = (event) => {
					const root = rootRef.current;
					if (root !== null && root.contains(event.target)) return;
					onClose();
				};
				const onKey = (event) => {
					if (event.key === "Escape") onClose();
				};
				const timer = window.setTimeout(() => {
					document.addEventListener("mousedown", onPointer, true);
					document.addEventListener("keydown", onKey, true);
				}, 0);
				return () => {
					window.clearTimeout(timer);
					document.removeEventListener("mousedown", onPointer, true);
					document.removeEventListener("keydown", onKey, true);
				};
			}, [onClose]);
			const commitHex = (raw) => {
				const normalized = normalizeHexColor(raw);
				if (normalized === null) {
					setHexInvalid(true);
					return false;
				}
				setHexInvalid(false);
				setHexDraft(normalized);
				store.setCustomBackground(normalized);
				return true;
			};
			const saveCurrentScheme = () => {
				const draft = hexDraft.trim();
				if (draft !== "") {
					const normalized = normalizeHexColor(draft);
					if (normalized === null) {
						setHexInvalid(true);
						return;
					}
					setHexInvalid(false);
					setHexDraft(normalized);
					store.setCustomBackground(normalized);
					store.saveScheme(normalized);
					return;
				}
				store.saveScheme();
			};
			const pickerValue = hexForColorInput(normalizeHexColor(hexDraft) ?? appearance.customBackground, appearance.theme);
			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: editor_module_css_default.appearanceMenu,
				role: "dialog",
				"aria-label": t("editorAppearance"),
				"data-file-explorer-appearance": "",
				children: [
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceLabel,
							children: t("editorTheme")
						}), (0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceThemeRow,
							role: "radiogroup",
							"aria-label": t("editorTheme"),
							children: THEME_OPTIONS.map((option) => (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "radio",
								"aria-checked": appearance.customBackground === null && appearance.theme === option.id,
								className: appearance.customBackground === null && appearance.theme === option.id ? `${editor_module_css_default.appearanceChip} ${editor_module_css_default.appearanceChipActive}` : editor_module_css_default.appearanceChip,
								onClick: () => store.setTheme(option.id),
								children: t(option.labelKey)
							}, option.id))
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceLabel,
								children: t("editorCustomColor")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: editor_module_css_default.appearanceColorRow,
								children: [
									(0, react_jsx_runtime.jsx)("input", {
										type: "color",
										className: editor_module_css_default.appearanceColorSwatch,
										value: pickerValue,
										"aria-label": t("editorCustomColor"),
										onChange: (event) => {
											commitHex(event.target.value);
										}
									}),
									(0, react_jsx_runtime.jsx)("input", {
										type: "text",
										className: hexInvalid ? `${editor_module_css_default.appearanceHexInput} ${editor_module_css_default.appearanceHexInvalid}` : editor_module_css_default.appearanceHexInput,
										value: hexDraft,
										spellCheck: false,
										placeholder: "#1e1e1e",
										"aria-invalid": hexInvalid,
										"aria-label": t("editorCustomColor"),
										onChange: (event) => {
											setHexDraft(event.target.value);
											setHexInvalid(false);
										},
										onBlur: () => {
											if (hexDraft.trim() === "") {
												store.setCustomBackground(null);
												setHexDraft(hexForColorInput(null, appearance.theme));
												setHexInvalid(false);
												return;
											}
											commitHex(hexDraft);
										},
										onKeyDown: (event) => {
											if (event.key === "Enter") {
												event.preventDefault();
												commitHex(hexDraft);
											}
										}
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: editor_module_css_default.appearanceStep,
										disabled: appearance.customBackground === null,
										onClick: () => {
											store.setCustomBackground(null);
											setHexDraft(hexForColorInput(null, appearance.theme));
											setHexInvalid(false);
										},
										children: t("editorCustomColorClear")
									})
								]
							}),
							hexInvalid ? (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorCustomColorInvalid")
							}) : (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorCustomColorHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.appearanceLabel,
							children: t("editorFontSize")
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: editor_module_css_default.appearanceFontRow,
							children: [
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: editor_module_css_default.appearanceStep,
									"aria-label": t("editorFontSmaller"),
									disabled: appearance.fontSize <= 11,
									onClick: () => store.bumpFont(-1),
									children: "A−"
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: editor_module_css_default.appearanceFontValue,
									children: [appearance.fontSize, "px"]
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: editor_module_css_default.appearanceStep,
									"aria-label": t("editorFontLarger"),
									disabled: appearance.fontSize >= 24,
									onClick: () => store.bumpFont(1),
									children: "A+"
								})
							]
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.appearanceSection,
						children: [
							(0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceLabel,
								children: t("editorScheme")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: editor_module_css_default.appearanceSaveScheme,
								onClick: saveCurrentScheme,
								children: t("editorSchemeSave")
							}),
							appearance.schemes.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
								className: editor_module_css_default.appearanceHint,
								children: t("editorSchemeEmpty")
							}) : (0, react_jsx_runtime.jsx)("ul", {
								className: editor_module_css_default.appearanceSchemeList,
								"aria-label": t("editorScheme"),
								children: appearance.schemes.map((scheme) => {
									const active = appearance.customBackground === scheme.background && appearance.fontSize === scheme.fontSize;
									return (0, react_jsx_runtime.jsxs)("li", {
										className: editor_module_css_default.appearanceSchemeItem,
										children: [(0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: active ? `${editor_module_css_default.appearanceSchemeApply} ${editor_module_css_default.appearanceSchemeApplyActive}` : editor_module_css_default.appearanceSchemeApply,
											onClick: () => store.applyScheme(scheme.id),
											children: [(0, react_jsx_runtime.jsx)("span", {
												className: editor_module_css_default.appearanceSchemeSwatch,
												style: { background: scheme.background },
												"aria-hidden": "true"
											}), (0, react_jsx_runtime.jsxs)("span", {
												className: editor_module_css_default.appearanceSchemeMeta,
												children: [
													scheme.background,
													" · ",
													scheme.fontSize,
													"px"
												]
											})]
										}), (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: editor_module_css_default.appearanceSchemeRemove,
											"aria-label": t("editorSchemeRemove"),
											onClick: () => store.removeScheme(scheme.id),
											children: "×"
										})]
									}, scheme.id);
								})
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/editor/TabStrip.js
		/**
		* Tab strip for open editor buffers, with close + context-menu actions.
		*/
		/**
		* Horizontal list of open paths with dirty marks, close buttons, and
		* right-click: close / close to the right / close all.
		*/
		function TabStrip(props) {
			const { tabs, activePath, buffers, t, onActivate, onClose, onClosePaths } = props;
			const [menu, setMenu] = (0, react.useState)(null);
			const closeMenu = (0, react.useCallback)(() => {
				setMenu(null);
			}, []);
			const menuItems = menu === null ? [] : (() => {
				const index = tabs.findIndex((tab) => tab.path === menu.path);
				const toRight = index >= 0 ? tabs.slice(index + 1).map((tab) => tab.path) : [];
				return [
					{
						id: "close",
						label: t("tabClose"),
						onSelect: () => {
							onClose(menu.path);
						}
					},
					{
						id: "close-right",
						label: t("tabCloseRight"),
						disabled: toRight.length === 0,
						onSelect: () => {
							if (toRight.length === 0) return;
							onClosePaths(toRight);
						}
					},
					{
						id: "close-all",
						label: t("tabCloseAll"),
						onSelect: () => {
							onClosePaths(tabs.map((tab) => tab.path));
						}
					}
				];
			})();
			return (0, react_jsx_runtime.jsxs)("div", {
				className: editor_module_css_default.tabs,
				role: "tablist",
				children: [tabs.map((tab) => {
					const active = tab.path === activePath;
					const dirty = buffers.isDirty(tab.path);
					return (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						className: active ? `${editor_module_css_default.tab} ${editor_module_css_default.tabActive}` : editor_module_css_default.tab,
						onClick: () => onActivate(tab.path),
						onContextMenu: (event) => {
							event.preventDefault();
							event.stopPropagation();
							onActivate(tab.path);
							setMenu({
								x: event.clientX,
								y: event.clientY,
								path: tab.path
							});
						},
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [tab.title, dirty ? (0, react_jsx_runtime.jsx)("span", {
							className: editor_module_css_default.dirtyMark,
							children: " •"
						}) : null] }), (0, react_jsx_runtime.jsx)("span", {
							className: editor_module_css_default.closeBtn,
							role: "button",
							tabIndex: 0,
							"aria-label": t("tabClose"),
							onClick: (event) => {
								event.stopPropagation();
								onClose(tab.path);
							},
							onKeyDown: (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									event.stopPropagation();
									onClose(tab.path);
								}
							},
							children: "×"
						})]
					}, tab.path);
				}), menu !== null ? (0, react_jsx_runtime.jsx)(ExplorerContextMenu, {
					x: menu.x,
					y: menu.y,
					items: menuItems,
					onClose: closeMenu
				}) : null]
			});
		}
		//#endregion
		//#region lib/types/client/editor/MarkdownPreview.js
		/**
		* Markdown preview using `marked`.
		*/
		/**
		* Render markdown source as HTML inside a scrollable pane.
		*/
		function MarkdownPreview(props) {
			const html = (0, react.useMemo)(() => {
				try {
					return marked.marked.parse(props.content, { async: false });
				} catch (error) {
					return `<pre>${escapeHtml(error instanceof Error ? error.message : "preview failed")}</pre>`;
				}
			}, [props.content]);
			return (0, react_jsx_runtime.jsx)("div", {
				className: editor_module_css_default.preview,
				"data-file-explorer-preview": "",
				dangerouslySetInnerHTML: { __html: html }
			});
		}
		function escapeHtml(text) {
			return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
		}
		//#endregion
		//#region lib/types/client/editor/EditorSurface.js
		/**
		* Center-column editor: tabs + Monaco/textarea + markdown preview.
		*/
		const appearanceStore = new EditorAppearanceStore();
		/**
		* Multi-tab editor surface bound to explorer RPC + local stores.
		*/
		function EditorSurface(props) {
			const { ctx, api, tabs, buffers, mdModes } = props;
			const t = useExplorerT(ctx);
			const tabState = (0, react.useSyncExternalStore)(tabs.subscribe, tabs.getSnapshot);
			(0, react.useSyncExternalStore)(buffers.subscribe, () => buffers.get(tabState.activePath ?? "")?.content ?? "");
			(0, react.useSyncExternalStore)(mdModes.subscribe, () => tabState.activePath === null ? "source" : mdModes.get(tabState.activePath));
			const appearance = (0, react.useSyncExternalStore)(appearanceStore.subscribe, appearanceStore.getSnapshot);
			const [error, setError] = (0, react.useState)(null);
			const [status, setStatus] = (0, react.useState)("");
			const [monacoReady, setMonacoReady] = (0, react.useState)(false);
			const [monacoFailed, setMonacoFailed] = (0, react.useState)(false);
			const [appearanceOpen, setAppearanceOpen] = (0, react.useState)(false);
			const hostRef = (0, react.useRef)(null);
			const editorRef = (0, react.useRef)(null);
			const applyingExternal = (0, react.useRef)(false);
			const activePath = tabState.activePath;
			const buffer = activePath === null ? void 0 : buffers.get(activePath);
			const mdMode = activePath !== null && isMarkdownPath(activePath) ? mdModes.get(activePath) : "source";
			(0, react.useLayoutEffect)(() => {
				appearanceStore.hydrate();
			}, []);
			const openPath = (0, react.useCallback)(async (path) => {
				tabs.open(path);
				if (buffers.get(path) !== void 0) return;
				const result = await api.read(path);
				if (!result.ok) {
					setError(result.error.message);
					tabs.close(path);
					return;
				}
				setError(null);
				buffers.load(path, result.value.content);
			}, [
				api,
				buffers,
				tabs
			]);
			(0, react.useEffect)(() => {
				const handler = (event) => {
					const detail = event.detail;
					if (detail?.path) openPath(detail.path);
				};
				window.addEventListener("file-explorer:open", handler);
				return () => window.removeEventListener("file-explorer:open", handler);
			}, [openPath]);
			const saveActive = (0, react.useCallback)(async () => {
				if (activePath === null) return;
				const entry = buffers.get(activePath);
				if (entry === void 0) return;
				const result = await api.write(activePath, entry.content);
				if (!result.ok) {
					setError(result.error.message);
					return;
				}
				buffers.markSaved(activePath);
				setError(null);
				setStatus(t("editorSaved"));
				window.setTimeout(() => setStatus(""), 1200);
			}, [
				activePath,
				api,
				buffers,
				t
			]);
			(0, react.useEffect)(() => {
				const onKey = (event) => {
					if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
						event.preventDefault();
						saveActive();
					}
				};
				window.addEventListener("keydown", onKey);
				return () => window.removeEventListener("keydown", onKey);
			}, [saveActive]);
			(0, react.useEffect)(() => {
				let cancelled = false;
				loadMonaco().then(() => {
					if (!cancelled) setMonacoReady(true);
				}).catch(() => {
					if (!cancelled) setMonacoFailed(true);
				});
				return () => {
					cancelled = true;
				};
			}, []);
			(0, react.useEffect)(() => {
				if (!monacoReady || monacoFailed || hostRef.current === null || activePath === null) {
					editorRef.current?.dispose();
					editorRef.current = null;
					return;
				}
				if (mdMode === "preview") {
					editorRef.current?.dispose();
					editorRef.current = null;
					return;
				}
				let disposed = false;
				const snap = appearanceStore.getSnapshot();
				loadMonaco().then((monaco) => {
					if (disposed || hostRef.current === null) return;
					editorRef.current?.dispose();
					const content = buffers.get(activePath)?.content ?? "";
					applyMonacoAppearance(monaco, snap);
					const editor = monaco.editor.create(hostRef.current, {
						value: content,
						language: languageForPath(activePath),
						automaticLayout: true,
						minimap: { enabled: false },
						fontSize: snap.fontSize,
						theme: snap.customBackground === null ? snap.theme : EDITOR_CUSTOM_THEME_ID,
						scrollBeyondLastLine: false
					});
					editorRef.current = editor;
					editor.onDidChangeModelContent(() => {
						if (applyingExternal.current) return;
						buffers.setContent(activePath, editor.getValue());
					});
				});
				return () => {
					disposed = true;
					editorRef.current?.dispose();
					editorRef.current = null;
				};
			}, [
				monacoReady,
				monacoFailed,
				activePath,
				mdMode,
				buffers
			]);
			(0, react.useEffect)(() => {
				if (!monacoReady || monacoFailed) return;
				loadMonaco().then((monaco) => {
					applyMonacoAppearance(monaco, appearance);
					editorRef.current?.updateOptions({ fontSize: appearance.fontSize });
				});
			}, [
				appearance.theme,
				appearance.customBackground,
				appearance.fontSize,
				monacoReady,
				monacoFailed
			]);
			(0, react.useEffect)(() => {
				if (activePath === null || editorRef.current === null) return;
				const next = buffers.get(activePath)?.content ?? "";
				if (editorRef.current.getValue() === next) return;
				applyingExternal.current = true;
				try {
					editorRef.current.setValue(next);
				} finally {
					applyingExternal.current = false;
				}
			}, [
				activePath,
				buffer?.content,
				buffers
			]);
			const dropTab = (0, react.useCallback)((path) => {
				tabs.close(path);
				buffers.drop(path);
				mdModes.drop(path);
			}, [
				buffers,
				mdModes,
				tabs
			]);
			const onClose = (0, react.useCallback)((path) => {
				if (buffers.isDirty(path)) {
					if (!window.confirm(t("confirmCloseDirty"))) return;
				}
				dropTab(path);
			}, [
				buffers,
				dropTab,
				t
			]);
			const onClosePaths = (0, react.useCallback)((paths) => {
				if (paths.length === 0) return;
				if (paths.some((path) => buffers.isDirty(path)) && !window.confirm(t("confirmCloseDirty"))) return;
				for (const path of paths) dropTab(path);
			}, [
				buffers,
				dropTab,
				t
			]);
			if (tabState.open.length === 0 || activePath === null) return (0, react_jsx_runtime.jsx)("div", {
				className: editor_module_css_default.surface,
				"data-file-explorer-editor": "",
				children: (0, react_jsx_runtime.jsx)("div", {
					className: editor_module_css_default.empty,
					children: t("editorEmpty")
				})
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: editor_module_css_default.surface,
				"data-file-explorer-editor": "",
				children: [
					(0, react_jsx_runtime.jsx)(TabStrip, {
						tabs: tabState.open,
						activePath,
						buffers,
						t,
						onActivate: (path) => tabs.activate(path),
						onClose,
						onClosePaths
					}),
					error !== null ? (0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.errorBanner,
						children: error
					}) : null,
					(0, react_jsx_runtime.jsxs)("div", {
						className: editor_module_css_default.toolbar,
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: editor_module_css_default.toolBtn,
								onClick: () => void saveActive(),
								children: t("editorSave")
							}),
							isMarkdownPath(activePath) ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: mdMode === "source" ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
								onClick: () => mdModes.set(activePath, "source"),
								children: t("editorSource")
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: mdMode === "preview" ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
								onClick: () => mdModes.set(activePath, "preview"),
								children: t("editorPreview")
							})] }) : null,
							(0, react_jsx_runtime.jsx)("span", {
								className: editor_module_css_default.status,
								children: status || (monacoFailed ? t("editorTextareaMode") : "")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: editor_module_css_default.toolbarEnd,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: appearanceOpen ? `${editor_module_css_default.toolBtn} ${editor_module_css_default.toolBtnActive}` : editor_module_css_default.toolBtn,
									"aria-expanded": appearanceOpen,
									"aria-haspopup": "dialog",
									onClick: () => setAppearanceOpen((open) => !open),
									children: t("editorAppearance")
								}), appearanceOpen ? (0, react_jsx_runtime.jsx)(AppearanceMenu, {
									t,
									appearance,
									store: appearanceStore,
									onClose: () => setAppearanceOpen(false)
								}) : null]
							})
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.pathBar,
						title: activePath,
						"aria-label": t("editorFilePath"),
						children: activePath
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: editor_module_css_default.body,
						children: mdMode === "preview" ? (0, react_jsx_runtime.jsx)(MarkdownPreview, { content: buffer?.content ?? "" }) : monacoReady && !monacoFailed ? (0, react_jsx_runtime.jsx)("div", {
							className: editor_module_css_default.monacoHost,
							ref: hostRef
						}) : (0, react_jsx_runtime.jsx)("textarea", {
							className: editor_module_css_default.textarea,
							style: {
								fontSize: appearance.fontSize,
								...appearance.customBackground !== null ? { background: appearance.customBackground } : {}
							},
							value: buffer?.content ?? "",
							onChange: (event) => buffers.setContent(activePath, event.target.value),
							spellCheck: false
						})
					})
				]
			});
		}
		/** Dispatch a cross-component open request. */
		function requestOpenPath(path) {
			window.dispatchEvent(new CustomEvent("file-explorer:open", { detail: { path } }));
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/ui/x6-plugin-file-explorer/src/client/settings/settings-card.module.css.mjs
		const css$1 = ".v8C-JG_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.v8C-JG_card:hover{border-color:var(--dsw-alias-label-dimmed)}.v8C-JG_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.v8C-JG_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.v8C-JG_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.v8C-JG_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.v8C-JG_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.v8C-JG_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.v8C-JG_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.v8C-JG_chevronOpen{transform:rotate(180deg)}.v8C-JG_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.v8C-JG_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.v8C-JG_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.v8C-JG_field+.v8C-JG_field{border-top:1px solid var(--dsw-alias-border-l2)}.v8C-JG_row{cursor:pointer;color:var(--dsw-alias-label-primary);align-items:center;gap:8px;font-size:13px;font-weight:500;line-height:1.5;display:flex}.v8C-JG_rowDisabled{cursor:not-allowed;opacity:.55}.v8C-JG_checkbox{width:14px;height:14px;accent-color:var(--dsw-alias-brand-primary);flex:none;margin:0}.v8C-JG_textInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);width:100%;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:8px 10px;font-size:13px}.v8C-JG_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}.v8C-JG_label{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500}";
		const tagId$1 = "@x6_ai/x6-plugin-file-explorer/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/x6-plugin-file-explorer";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"body": "v8C-JG_body",
			"card": "v8C-JG_card",
			"cardOpen": "v8C-JG_cardOpen",
			"checkbox": "v8C-JG_checkbox",
			"chevron": "v8C-JG_chevron",
			"chevronOpen": "v8C-JG_chevronOpen",
			"description": "v8C-JG_description",
			"field": "v8C-JG_field",
			"headText": "v8C-JG_headText",
			"header": "v8C-JG_header",
			"hint": "v8C-JG_hint",
			"label": "v8C-JG_label",
			"name": "v8C-JG_name",
			"readOnly": "v8C-JG_readOnly",
			"row": "v8C-JG_row",
			"rowDisabled": "v8C-JG_rowDisabled",
			"textInput": "v8C-JG_textInput"
		};
		//#endregion
		//#region lib/types/client/settings/ExplorerSettingsCard.js
		/**
		* Plugins page contribution for file explorer preferences.
		*/
		/** Summary one-liner or settings form body for the Plugins page. */
		function ExplorerSettingsCard(props) {
			const { ctx, scope, view, t: slotT } = props;
			const snap = (0, react.useSyncExternalStore)(scope.subscribe, () => scope.getSnapshot());
			const t = explorerT((0, react.useSyncExternalStore)((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active));
			const [draftRoot, setDraftRoot] = (0, react.useState)(null);
			const [saving, setSaving] = (0, react.useState)(false);
			if (view === "summary") return slotT("settingsDescription");
			const available = snap.status === "ready";
			const writable = snap.writable;
			const value = snap.value;
			if (!available || value === void 0) return null;
			const rootValue = draftRoot ?? value.root;
			const openLinks = value.openLinksInEditor;
			const commitRoot = (0, react.useCallback)(async () => {
				if (!writable || saving || draftRoot === null) return;
				setSaving(true);
				try {
					await scope.set("root", draftRoot);
					setDraftRoot(null);
				} finally {
					setSaving(false);
				}
			}, [
				draftRoot,
				saving,
				scope,
				writable
			]);
			const toggleLinks = (0, react.useCallback)(async (checked) => {
				if (!writable || saving) return;
				setSaving(true);
				try {
					await scope.set("openLinksInEditor", checked);
				} finally {
					setSaving(false);
				}
			}, [
				saving,
				scope,
				writable
			]);
			return (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.body,
				children: [
					!writable ? (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.readOnly,
						role: "status",
						children: t("readOnly")
					}) : null,
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [
							(0, react_jsx_runtime.jsx)("label", {
								className: settings_card_module_css_default.label,
								htmlFor: "fe-root",
								children: t("settingsRoot")
							}),
							(0, react_jsx_runtime.jsx)("input", {
								id: "fe-root",
								className: settings_card_module_css_default.textInput,
								value: rootValue,
								disabled: !writable || saving,
								onChange: (event) => setDraftRoot(event.target.value),
								onBlur: () => {
									commitRoot();
								},
								onKeyDown: (event) => {
									if (event.key === "Enter") commitRoot();
								}
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: settings_card_module_css_default.hint,
								children: t("settingsRootHint")
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.field,
						children: [(0, react_jsx_runtime.jsxs)("label", {
							className: writable ? settings_card_module_css_default.row : `${settings_card_module_css_default.row} ${settings_card_module_css_default.rowDisabled}`,
							children: [(0, react_jsx_runtime.jsx)("input", {
								className: settings_card_module_css_default.checkbox,
								type: "checkbox",
								checked: openLinks,
								disabled: !writable || saving,
								onChange: (event) => {
									toggleLinks(event.target.checked);
								}
							}), (0, react_jsx_runtime.jsx)("span", { children: t("settingsOpenLinks") })]
						}), (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.hint,
							children: t("settingsOpenLinksHint")
						})]
					})
				]
			});
		}
		//#endregion
		//#region lib/types/client/open-links.js
		/**
		* Capture clicks on conversation file-looking links and open them in the editor.
		*/
		const ABS_PATH = /^(?:\/|[A-Za-z]:[\\/])/;
		const REL_PATH = /^\.\.?[\\/]/;
		function candidateFromAnchor(anchor) {
			const dataPath = anchor.getAttribute("data-path") ?? anchor.getAttribute("data-filepath");
			if (dataPath !== null && dataPath.trim() !== "") return dataPath.trim();
			const href = anchor.getAttribute("href");
			if (href === null || href === "" || href.startsWith("#") || href.startsWith("mailto:")) return null;
			if (href.startsWith("file:")) try {
				return decodeURIComponent(href.replace(/^file:\/\//, "").replace(/^\/([A-Za-z]:)/, "$1"));
			} catch {
				return null;
			}
			if (ABS_PATH.test(href) || REL_PATH.test(href)) return href;
			if (!href.includes("://") && href.includes("/") && !href.startsWith("//")) return href;
			return null;
		}
		/**
		* Install a capture-phase click interceptor while settings allow it.
		* @returns disposer.
		*/
		function installOpenLinksInterceptor(scope) {
			const onClick = (event) => {
				const snap = scope.getSnapshot();
				if (snap.status !== "ready" || snap.value?.openLinksInEditor !== true) return;
				const target = event.target;
				if (!(target instanceof Element)) return;
				const anchor = target.closest("a");
				if (!(anchor instanceof HTMLAnchorElement)) return;
				const path = candidateFromAnchor(anchor);
				if (path === null) return;
				event.preventDefault();
				event.stopPropagation();
				requestOpenPath((ABS_PATH.test(path) ? path.replace(/^\/+/, "").replace(/^[A-Za-z]:[\\/]/, "") : path.replace(/^\.\//, "")).replaceAll("\\", "/"));
				window.dispatchEvent(new CustomEvent("file-explorer:focus-view"));
			};
			document.addEventListener("click", onClick, true);
			return () => document.removeEventListener("click", onClick, true);
		}
		//#endregion
		//#region lib/types/client/session-pin.js
		/**
		* Pin explorer root to the current session cwd when available.
		*/
		/**
		* Keep host root aligned with session cwd while explorer mode is on.
		* Re-syncs when the session changes or when mode turns on.
		*
		* Navigation lives on `uiSession.adapter.current` (SessionList no longer
		* exposes `.current` after the Controller / ui-session split).
		* @returns disposer.
		*/
		function installSessionRootPin(ctx, api, mode) {
			const sessions = ctx.get("sessions");
			const uiSession = ctx.get("uiSession");
			if (sessions === void 0 || uiSession === void 0) return () => {};
			let pinnedCwd;
			const sync = () => {
				if (!mode.getSnapshot()) return;
				const current = uiSession.adapter.current.getSnapshot().key;
				if (current === void 0) return;
				const cwd = sessions.list.getSnapshot().byId[current]?.cwd;
				if (cwd === void 0 || cwd.trim() === "") return;
				if (cwd === pinnedCwd) return;
				api.setRoot(cwd).then((result) => {
					if (!result.ok) return;
					pinnedCwd = cwd;
					notifyRootPinned();
				});
			};
			sync();
			const unsubBinding = uiSession.adapter.current.subscribe(sync);
			const unsubSessions = sessions.list.subscribe(sync);
			const unsubMode = mode.subscribe(() => {
				sync();
			});
			return () => {
				unsubBinding();
				unsubSessions();
				unsubMode();
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/hivanpan/Hivan/project/ykl/project/Whale/x6/x6-harness-free/plugins/packages/ui/x6-plugin-file-explorer/src/client/files-view.module.css.mjs
		const css = ".WTh8cq_shell{width:100%;height:100%;min-height:0;position:relative;overflow:hidden}.WTh8cq_filesView{box-sizing:border-box;background:var(--dsw-alias-bg-layer-1);width:100%;min-height:0;color:var(--dsw-alias-label-primary);display:flex;position:absolute;inset:0;overflow:hidden}.WTh8cq_treeCol{border-right:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex-shrink:0;min-width:160px;max-width:70%;min-height:0;position:relative;overflow:hidden}.WTh8cq_treeResize{z-index:2;cursor:col-resize;touch-action:none;width:6px;height:100%;position:absolute;top:0;right:-3px}.WTh8cq_treeResize:hover,.WTh8cq_treeResize:active{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4c8bf5)35%,transparent)}.WTh8cq_editorCol{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex;overflow:hidden}.WTh8cq_crash{color:var(--dsw-alias-label-danger,#c62828);padding:16px;font-size:13px}";
		const tagId = "@x6_ai/x6-plugin-file-explorer/files-view.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@x6_ai/x6-plugin-file-explorer";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var files_view_module_css_default = {
			"crash": "WTh8cq_crash",
			"editorCol": "WTh8cq_editorCol",
			"filesView": "WTh8cq_filesView",
			"shell": "WTh8cq_shell",
			"treeCol": "WTh8cq_treeCol",
			"treeResize": "WTh8cq_treeResize"
		};
		//#endregion
		//#region lib/types/client/index.js
		/**
		* Client half: Files tab fills the conversation viewArea (composer-overlay
		* contract) with a center tree | editor split. Left sidebar stays the
		* official workspace / conversation list (no sidebar.workspaces shadow).
		*/
		const PACKAGE = "@x6_ai/x6-plugin-file-explorer";
		const VIEW_ID = "file-explorer";
		/** Required client services before apply runs. */
		const inject = [
			"slots",
			"remote",
			"locale",
			"connection",
			"configForms"
		];
		/**
		* Mount remotes and register UI slots.
		* @param ctx - Client root context.
		*/
		async function apply(ctx) {
			const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
			ctx.effect(() => disposeRemote, "x6-file-explorer: remote");
			ctx.effect(() => ctx.locale.register(NS, dictionaries), "x6-file-explorer: dictionaries");
			const settings = ctx.configForms.get(FILE_EXPLORER_SETTINGS_NS);
			const tabs = new TabsStore();
			const buffers = new BuffersStore();
			const mdModes = new MdModeStore();
			const mode = new ExplorerModeStore();
			ctx.inject(["remote.explorerFs"], (remoteCtx) => {
				const api = createExplorerApi(remoteCtx);
				remoteCtx.effect(() => installOpenLinksInterceptor(settings), "x6-file-explorer: open-links");
				remoteCtx.inject(["sessions", "uiSession"], (sessionCtx) => {
					sessionCtx.effect(() => installSessionRootPin(sessionCtx, api, mode), "x6-file-explorer: session-pin");
				});
				remoteCtx.effect(() => {
					let disposeComposer;
					const syncComposer = () => {
						const enabled = mode.getSnapshot();
						if (disposeComposer !== void 0) {
							try {
								disposeComposer();
							} catch (error) {
								console.error("[file-explorer] composer dispose failed", error);
							}
							disposeComposer = void 0;
						}
						if (!enabled) return;
						try {
							disposeComposer = remoteCtx.effect(() => remoteCtx.slots.register({
								name: "conversation.composer",
								priority: 50,
								registrant: PACKAGE,
								select: () => ({ hide: true })
							}, () => null), "x6-file-explorer: composer-hide");
						} catch (error) {
							console.error("[file-explorer] conversation.composer register failed", error);
						}
					};
					syncComposer();
					const unsub = mode.subscribe(syncComposer);
					return () => {
						unsub();
						if (disposeComposer !== void 0) {
							try {
								disposeComposer();
							} catch {}
							disposeComposer = void 0;
						}
					};
				}, "x6-file-explorer: mode→composer");
				remoteCtx.slots.inject("conversation.view", () => remoteCtx.slots.register({
					name: "conversation.view",
					id: VIEW_ID,
					order: 40,
					locale: NS,
					label: () => explorerT(remoteCtx.locale.getSnapshot().active)("viewLabel"),
					registrant: PACKAGE
				}, () => (0, react_jsx_runtime.jsx)(FilesView, {
					ctx: remoteCtx,
					mode,
					api,
					tabs,
					buffers,
					mdModes
				})));
				const t = remoteCtx.locale.bind(NS);
				remoteCtx.effect(() => remoteCtx.configForms.whileServed([FILE_EXPLORER_SETTINGS_NS], () => remoteCtx.slots.inject("plugins.item", () => remoteCtx.slots.register({
					name: "plugins.item",
					id: "file-explorer",
					order: 45,
					label: () => t("settingsTitle"),
					locale: NS,
					registrant: PACKAGE
				}, (props) => (0, react_jsx_runtime.jsx)(ExplorerSettingsCard, {
					ctx: remoteCtx,
					scope: settings,
					...props
				})))), "x6-file-explorer: plugins.item");
			});
		}
		var FilesViewBoundary = class extends react.Component {
			state = { message: null };
			static getDerivedStateFromError(error) {
				return { message: error.message };
			}
			componentDidCatch(error, info) {
				console.error("[file-explorer] FilesView crash", error, info);
			}
			render() {
				if (this.state.message !== null) return (0, react_jsx_runtime.jsx)("div", {
					className: files_view_module_css_default.shell,
					"data-file-explorer-view": "",
					"data-conversation-composer-overlay": "",
					children: (0, react_jsx_runtime.jsx)("div", {
						className: files_view_module_css_default.crash,
						children: this.state.message
					})
				});
				return this.props.children;
			}
		};
		const TREE_WIDTH_KEY = "x6-file-explorer:tree-width";
		const TREE_WIDTH_DEFAULT = 280;
		const TREE_WIDTH_MIN = 160;
		const TREE_WIDTH_MAX = 720;
		function readTreeWidth() {
			try {
				const raw = window.localStorage.getItem(TREE_WIDTH_KEY);
				if (raw === null) return TREE_WIDTH_DEFAULT;
				const n = Number(raw);
				if (!Number.isFinite(n)) return TREE_WIDTH_DEFAULT;
				return Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, Math.round(n)));
			} catch {
				return TREE_WIDTH_DEFAULT;
			}
		}
		/**
		* Files conversation view. The root MUST carry
		* `data-conversation-composer-overlay` so ConversationRoot stretches
		* `.viewArea`; without it the pane collapses to zero height.
		*/
		function FilesView(props) {
			const { ctx, mode, api, tabs, buffers, mdModes } = props;
			const t = useExplorerT(ctx);
			const [treeWidth, setTreeWidth] = (0, react.useState)(TREE_WIDTH_DEFAULT);
			const dragRef = (0, react.useRef)(null);
			(0, react.useLayoutEffect)(() => {
				setTreeWidth(readTreeWidth());
			}, []);
			(0, react.useLayoutEffect)(() => {
				mode.setEnabled(true);
				return () => {
					mode.setEnabled(false);
				};
			}, [mode]);
			const onResizePointerDown = (0, react.useCallback)((event) => {
				event.preventDefault();
				event.currentTarget.setPointerCapture(event.pointerId);
				dragRef.current = {
					startX: event.clientX,
					startWidth: treeWidth
				};
			}, [treeWidth]);
			const onResizePointerMove = (0, react.useCallback)((event) => {
				const drag = dragRef.current;
				if (drag === null) return;
				const next = Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, drag.startWidth + (event.clientX - drag.startX)));
				setTreeWidth(next);
			}, []);
			const onResizePointerUp = (0, react.useCallback)((event) => {
				if (dragRef.current === null) return;
				dragRef.current = null;
				try {
					event.currentTarget.releasePointerCapture(event.pointerId);
				} catch {}
				setTreeWidth((width) => {
					try {
						window.localStorage.setItem(TREE_WIDTH_KEY, String(width));
					} catch {}
					return width;
				});
			}, []);
			return (0, react_jsx_runtime.jsx)(FilesViewBoundary, { children: (0, react_jsx_runtime.jsx)("div", {
				className: files_view_module_css_default.shell,
				"data-file-explorer-view": "",
				"data-conversation-composer-overlay": "",
				children: (0, react_jsx_runtime.jsxs)("div", {
					className: files_view_module_css_default.filesView,
					children: [(0, react_jsx_runtime.jsxs)("aside", {
						className: files_view_module_css_default.treeCol,
						style: { width: treeWidth },
						"aria-label": t("treeAriaLabel"),
						children: [(0, react_jsx_runtime.jsx)(ExplorerPanel, {
							ctx,
							api,
							tabs,
							onOpenFile: (path) => {
								requestOpenPath(path);
							}
						}), (0, react_jsx_runtime.jsx)("div", {
							className: files_view_module_css_default.treeResize,
							role: "separator",
							"aria-orientation": "vertical",
							"aria-valuenow": treeWidth,
							"aria-valuemin": TREE_WIDTH_MIN,
							"aria-valuemax": TREE_WIDTH_MAX,
							onPointerDown: onResizePointerDown,
							onPointerMove: onResizePointerMove,
							onPointerUp: onResizePointerUp,
							onPointerCancel: onResizePointerUp
						})]
					}), (0, react_jsx_runtime.jsx)("div", {
						className: files_view_module_css_default.editorCol,
						children: (0, react_jsx_runtime.jsx)(EditorSurface, {
							ctx,
							api,
							tabs,
							buffers,
							mdModes
						})
					})]
				})
			}) });
		}
		//#endregion
		exports.VIEW_ID = VIEW_ID;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map