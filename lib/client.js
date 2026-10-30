window.__ModuleLoader__.load({
	id: "@x6_ai/x6-plugin-file-explorer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		//#region lib/types/shared/settings-contract.js
		/** Settings namespace contract visible to both Host and Client. */
		/**
		* Profile entry id from `cordis.patch.yml` (`x6-file-explorer`).
		* dsh ≥ 0.1.7 projects volatile Config under this id into `configForms`.
		*/
		const FILE_EXPLORER_SETTINGS_NS = "x6-file-explorer";
		//#endregion
		//#region node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function joinValues(array, separator = "|") {
			return array.map((val) => stringifyPrimitive(val)).join(separator);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		var Cached = class {
			constructor(getter) {
				this._getter = getter;
				this._value = void 0;
			}
			get value() {
				const getter = this._getter;
				if (getter !== void 0) {
					this._value = getter();
					this._getter = void 0;
				}
				return this._value;
			}
		};
		function cached(getter) {
			return new Cached(getter);
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = 4 * Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		/**
		* Whichever object a def's `shape` currently answers from: the one the caller passed until the first read, the frozen copy after it.
		*
		* Its keys and descriptors read without invoking anything, which is what lets a discriminated union check its discriminator, and the cycle walk read a shape, without resolving a getter that references the schema being constructed. A def that answers `shape` from an accessor of its own has none.
		*/
		function rawShape(def) {
			const desc = Object.getOwnPropertyDescriptor(def, "shape");
			return desc?.get ? desc.get.raw : desc?.value;
		}
		function sourceShape(schema) {
			return rawShape(schema._zod.def) ?? schema._zod.def.shape;
		}
		function deferProp(target, key, getter) {
			Object.defineProperty(target, key, {
				get() {
					const value = getter();
					assignProp(this, key, value);
					return value;
				},
				enumerable: true,
				configurable: true
			});
		}
		function putProp(target, key, value) {
			if (key in target) assignProp(target, key, value);
			else target[key] = value;
		}
		/**
		* Copies `keys` of `source`'s shape onto `target`, each value passed through `wrap`.
		*
		* A key the source has resolved is copied through now, so the derived shape states it outright and nothing has to resolve it to learn what it holds. A key the source still defers stays deferred, and reads back through the source's own `shape`, so it resolves once and both shapes get that one schema.
		*/
		function mirrorShape(target, source, keys, wrap) {
			const raw = sourceShape(source);
			for (const key of keys) {
				const desc = Object.getOwnPropertyDescriptor(raw, key);
				if (!desc.enumerable) continue;
				if (desc.get) deferProp(target, key, () => {
					const value = source._zod.def.shape[key];
					return wrap ? wrap(value, key) : value;
				});
				else putProp(target, key, wrap ? wrap(desc.value, key) : desc.value);
			}
		}
		function mirrorProps(target, source) {
			for (const key of Reflect.ownKeys(source)) {
				const desc = Object.getOwnPropertyDescriptor(source, key);
				if (!desc.enumerable) continue;
				if (desc.get) deferProp(target, key, () => source[key]);
				else putProp(target, key, desc.value);
			}
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) {
				const descriptors = Object.getOwnPropertyDescriptors(def);
				Object.assign(mergedDescriptors, descriptors);
			}
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function stringifyPrimitive(value) {
			if (typeof value === "bigint") return value.toString() + "n";
			if (typeof value === "string") return `"${value}"`;
			return `${value}`;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin !== void 0 && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = /*@__PURE__*/ (() => ({
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		}))();
		const BIGINT_FORMAT_RANGES = {
			int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
			uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			const newShape = {};
			mirrorShape(newShape, schema, maskedKeys(schema, mask));
			return clone(schema, mergeDefs(currDef, {
				shape: newShape,
				checks: []
			}));
		}
		function maskedKeys(schema, mask) {
			const raw = sourceShape(schema);
			const keys = [];
			for (const key of Reflect.ownKeys(mask)) {
				if (!Object.getOwnPropertyDescriptor(raw, key)?.enumerable) throw new Error(`Unrecognized key: "${String(key)}"`);
				if (mask[key]) keys.push(key);
			}
			return keys;
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			const omitted = new Set(maskedKeys(schema, mask));
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)).filter((key) => !omitted.has(key)));
			return clone(schema, mergeDefs(currDef, {
				shape: newShape,
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = sourceShape(schema);
				for (const key of Reflect.ownKeys(shape)) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
		}
		function extended(schema, shape) {
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)));
			mirrorProps(newShape, shape);
			return newShape;
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { shape: extended(schema, shape) }));
		}
		function merge(a, b) {
			if (!b?._zod?.def) throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			const newShape = {};
			mirrorShape(newShape, a, Reflect.ownKeys(sourceShape(a)));
			mirrorShape(newShape, b, Reflect.ownKeys(sourceShape(b)));
			return clone(a, mergeDefs(a._zod.def, {
				shape: newShape,
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask, name = "partial") {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(`.${name}() cannot be used on object schemas containing refinements`);
			const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), Class && ((value, key) => selected && !selected.has(key) ? value : new Class({
				type: "optional",
				innerType: value
			})));
			return clone(schema, mergeDefs(schema._zod.def, {
				shape: newShape,
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			const selected = mask ? new Set(maskedKeys(schema, mask)) : void 0;
			const newShape = {};
			mirrorShape(newShape, schema, Reflect.ownKeys(sourceShape(schema)), (value, key) => selected && !selected.has(key) ? value : new Class({
				type: "nonoptional",
				innerType: value
			}));
			return clone(schema, mergeDefs(schema._zod.def, { shape: newShape }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		/** The leading size checks of `defChecks` that set an upper bound, each paired with it. */
		function sizeCaps(defChecks) {
			const caps = [];
			for (const ch of defChecks ?? []) {
				const d = ch._zod.def;
				if (!/_(length|size)$|_equals$/.test(d.check)) break;
				const max = d.maximum ?? d.length ?? d.size;
				if (max >= 0) caps.push([max, ch]);
			}
			return caps;
		}
		function attachSchema(issues, start, inst) {
			var _a;
			for (let i = start; i < issues.length; i++) (_a = issues[i]).schema ?? (_a.schema = inst);
		}
		function finalizeIssue(iss, ctx, config) {
			var _a;
			const traits = iss.inst?._zod?.traits;
			if (traits?.has("$ZodType")) if (traits.has("$ZodCheck")) (_a = iss).schema ?? (_a.schema = iss.inst);
			else iss.schema = iss.inst;
			const schemaError = iss.schema !== iss.inst ? iss.schema?._zod.def?.error : void 0;
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(schemaError?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const full = {};
			for (const k of Object.keys(iss)) {
				if (k === "inst" || k === "schema" || k === "continue" || k === "input" || k === "__proto__") continue;
				full[k] = iss[k];
			}
			full.path ?? (full.path = []);
			full.message = message;
			if (ctx?.reportInput) full.input = iss.input;
			return full;
		}
		const highSurrogate = /[\uD800-\uDBFF]/;
		function codePointLength(str) {
			const units = str.length;
			if (!highSurrogate.test(str)) return units;
			let count = units;
			for (let i = 0; i < units - 1; i++) if ((str.charCodeAt(i) & 64512) === 55296 && (str.charCodeAt(i + 1) & 64512) === 56320) {
				count--;
				i++;
			}
			return count;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function parsedType(data) {
			const t = typeof data;
			switch (t) {
				case "number": return Number.isNaN(data) ? "nan" : "number";
				case "object": {
					if (data === null) return "null";
					if (Array.isArray(data)) return "array";
					const obj = data;
					if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) return obj.constructor.name;
				}
			}
			return t;
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		/**
		* Installs a trait's members on its prototype. Each value builds that member for the instance on first read; the built value shadows the accessor as an own property, so a detached `const { parse } = schema` keeps working.
		*
		* Call this from a `proto` initializer, which runs once per prototype — never per instance.
		*/
		function members(proto, table) {
			for (const key in table) {
				const desc = Object.getOwnPropertyDescriptor(table, key);
				if (desc.get) Object.defineProperty(proto, key, {
					...desc,
					enumerable: false
				});
				else defineBound(proto, key, desc.value);
			}
		}
		/** Shadows a prototype member with an own value, so a getter that builds from the instance runs once. */
		function own(inst, key, value, enumerable = true) {
			Object.defineProperty(inst, key, {
				configurable: true,
				writable: true,
				enumerable,
				value
			});
			return value;
		}
		/** Like {@link own}, for a member that was never an own data property and has to stay out of `Object.keys`. */
		function hide(inst, key, value) {
			return own(inst, key, value, false);
		}
		/** Adds members a table derives from the instance: each builds on first read and shadows as own data, and assignment shadows the same way, as when these were own properties. */
		function derived(computes, table) {
			for (const key in computes) {
				const compute = computes[key];
				Object.defineProperty(table, key, {
					configurable: true,
					enumerable: true,
					get() {
						return own(this, key, compute(this));
					},
					set(value) {
						own(this, key, value);
					}
				});
			}
			return table;
		}
		function defineBound(proto, key, fn) {
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					return this == null ? fn : own(this, key, fn.bind(this));
				},
				set(value) {
					own(this, key, value);
				}
			});
		}
		/** Returns the prototype to install on, or `undefined` if this group is already installed on it. */
		function claim(inst, sentinel) {
			const proto = Object.getPrototypeOf(inst);
			return sentinel in proto ? void 0 : proto;
		}
		let installing;
		let broke = false;
		const breaker = {
			configurable: true,
			get() {
				broke = true;
			}
		};
		/**
		* Installs a lazily-derived internal on the `_zod` prototype of `inst`'s
		* constructor, computed from the internals object itself and cached there on
		* first read. One accessor per constructor rather than one per instance.
		*/
		function defineLazyInternal(inst, key, compute) {
			const proto = Object.getPrototypeOf(inst._zod);
			if (key in proto && installing !== inst._zod) {
				installing = void 0;
				return;
			}
			installing = inst._zod;
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					Object.defineProperty(this, key, breaker);
					const outer = broke;
					broke = false;
					try {
						const value = compute(this);
						if (broke) delete this[key];
						else Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							value
						});
						broke = broke || outer;
						return value;
					} catch (err) {
						delete this[key];
						broke = broke || outer;
						throw err;
					}
				},
				set(value) {
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						value
					});
				}
			});
		}
		/**
		* Installs `key` on `inst`'s prototype, computed by `make` on first read and cached there as an own
		* data property. One accessor per constructor rather than one per instance, because an own accessor
		* puts every instance after the first into v8 dictionary mode. The key doubles as the sentinel.
		*/
		function installLazyProp(inst, key, make, enumerable) {
			const proto = claim(inst, key);
			if (!proto) return;
			Object.defineProperty(proto, key, {
				configurable: true,
				get() {
					const desc = {
						configurable: true,
						writable: true,
						enumerable,
						value: void 0
					};
					Object.defineProperty(this, key, desc);
					desc.value = make(this);
					Object.defineProperty(this, key, desc);
					return desc.value;
				},
				set(value) {
					Object.defineProperty(this, key, {
						configurable: true,
						writable: true,
						enumerable,
						value
					});
				}
			});
		}
		/** Marks the thunk `_catch` synthesises for a constant catch value. `Function.length` cannot tell that thunk from a user callback — rest and defaulted parameters both report arity 0 — and a user callback reads `ctx.error`, whose issues only finalize correctly against the caller's per-parse error map. Provenance can say what arity cannot. A plain string key rather than `Symbol.for`, whose call at module scope no bundler can prove pure — the same shape that anchored `urlCanParse` into every build. */
		const CONSTANT_CATCH = "~constantCatch";
		/** Wraps a constant catch value in a thunk tagged with {@link CONSTANT_CATCH}. */
		function constantCatch(value) {
			const fn = () => value;
			fn[CONSTANT_CATCH] = true;
			return fn;
		}
		//#endregion
		//#region node_modules/zod/v4/core/core.js
		var _a$1;
		const _zodDesc = {
			value: void 0,
			enumerable: false
		};
		let _E = "captureStackTrace" in Error ? Error : null;
		function newError(Definition) {
			const E = _E;
			if (E) {
				const saved = E.stackTraceLimit;
				if (typeof saved === "number") {
					try {
						E.stackTraceLimit = 0;
					} catch {
						_E = null;
						return new Definition();
					}
					try {
						return new Definition();
					} finally {
						E.stackTraceLimit = saved;
					}
				}
			}
			return new Definition();
		}
		function $constructor(name, initializer, proto, params) {
			const zodProto = {};
			function Internals(def) {
				this.def = def;
				this.constr = _;
				this.traits = /* @__PURE__ */ new Set();
			}
			Internals.prototype = zodProto;
			const protoMembers = proto;
			const initialized = protoMembers && /* @__PURE__ */ new WeakSet();
			function init(inst, def) {
				if (!inst._zod) {
					_zodDesc.value = new Internals(def);
					try {
						Object.defineProperty(inst, "_zod", _zodDesc);
					} finally {
						_zodDesc.value = void 0;
					}
				} else if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				if (initialized) {
					const own = Object.getPrototypeOf(inst);
					const ctorProto = inst._zod.constr.prototype;
					let up = own;
					while (up && up !== ctorProto) up = Object.getPrototypeOf(up);
					const target = up ?? own;
					if (!initialized.has(target)) {
						initialized.add(target);
						members(target, protoMembers);
					}
				}
				const proto = _.prototype;
				for (const k in proto) {
					if (!Object.prototype.hasOwnProperty.call(proto, k)) continue;
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				const inst = params?.Parent ? newError(Definition) : this;
				init(inst, def);
				const deferred = inst._zod.deferred;
				if (deferred) {
					for (const fn of deferred) fn();
					inst._zod.deferred = void 0;
				}
				const pp = globalThis.__zod_globalConfig?.postProcessor;
				if (pp) pp(inst);
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region node_modules/zod/v4/core/errors.js
		function _getMessage() {
			const internals = this._zod;
			internals.message ?? (internals.message = JSON.stringify(internals.def, jsonStringifyReplacer, 2));
			return internals.message;
		}
		function _setMessage(value) {
			this._zod.message = value;
		}
		const _messageDesc = {
			get: _getMessage,
			set: _setMessage,
			enumerable: true,
			configurable: true
		};
		const _issuesDesc = {
			value: void 0,
			enumerable: false
		};
		const _installedToString = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			_issuesDesc.value = def;
			Object.defineProperty(inst, "issues", _issuesDesc);
			_issuesDesc.value = void 0;
			Object.defineProperty(inst, "message", _messageDesc);
			const proto = Object.getPrototypeOf(inst);
			if (!_installedToString.has(proto)) {
				_installedToString.add(proto);
				Object.defineProperty(proto, "toString", {
					configurable: true,
					enumerable: false,
					get() {
						const value = () => this.message;
						Object.defineProperty(this, "toString", {
							value,
							configurable: true,
							writable: true
						});
						return value;
					},
					set(value) {
						Object.defineProperty(this, "toString", {
							value,
							configurable: true,
							writable: true
						});
					}
				});
			}
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		$constructor("$ZodError", initializer$1, void 0, { Parent: Error });
		/** Get-or-create `obj[key]` as an own data property. A path segment naming an inherited member
		* ("toString", "constructor") would otherwise read through to the prototype, and assigning
		* "__proto__" would hit the setter instead of creating a key. */
		function node(obj, key, make) {
			if (!Object.prototype.hasOwnProperty.call(obj, key)) if (key === "__proto__") Object.defineProperty(obj, key, {
				value: make(),
				writable: true,
				enumerable: true,
				configurable: true
			});
			else obj[key] = make();
			return obj[key];
		}
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) node(fieldErrors, sub.path[0], () => []).push(mapper(sub));
			else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							const terminal = i === fullpath.length - 1;
							if (el === "_errors") {
								if (terminal) curr._errors.push(mapper(issue));
								i++;
								continue;
							}
							if (!Object.prototype.hasOwnProperty.call(curr, el)) Object.defineProperty(curr, el, {
								value: { _errors: [] },
								enumerable: true,
								writable: true,
								configurable: true
							});
							const node = curr[el];
							if (terminal) node._errors.push(mapper(issue));
							curr = node;
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region node_modules/zod/v4/core/parse.js
		function finalizeParams(callee, params) {
			return {
				callee: params?.callee ?? callee,
				Err: params?.Err
			};
		}
		const _parse = (_Err) => {
			const fn = (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: false
				} : { async: false };
				const result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) throw new $ZodAsyncError();
				if (result.issues.length) {
					const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
					captureStackTrace(e, _params?.callee ?? fn);
					throw e;
				}
				return result.value;
			};
			return fn;
		};
		const _parseAsync = (_Err) => {
			const fn = async (schema, value, _ctx, params) => {
				const ctx = _ctx ? {
					..._ctx,
					async: true
				} : { async: true };
				let result = schema._zod.run({
					value,
					issues: []
				}, ctx);
				if (result instanceof Promise) result = await result;
				if (result.issues.length) {
					const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
					captureStackTrace(e, params?.callee ?? fn);
					throw e;
				}
				return result.value;
			};
			return fn;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? failure(_Err, result.issues, ctx) : {
				success: true,
				data: result.value
			};
		};
		function failure(Err, issues, ctx) {
			let error;
			return {
				success: false,
				get error() {
					if (!error) {
						error = new Err(issues.map((iss) => finalizeIssue(iss, ctx, config())));
						issues = void 0;
						ctx = void 0;
					}
					return error;
				},
				set error(e) {
					error = e;
					issues = void 0;
					ctx = void 0;
				}
			};
		}
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? failure(_Err, result.issues, ctx) : {
				success: true,
				data: result.value
			};
		};
		const COMPILE_INVALID = /* @__PURE__ */ Symbol.for("zod.compile.invalid");
		const COMPILE_FALLBACK = /* @__PURE__ */ Symbol.for("zod.compile.fallback");
		const validate = ((schema, value, _ctx) => {
			const validator = schema._zod.bag.validator;
			if (validator !== void 0) {
				if (validator(value) !== COMPILE_INVALID) return true;
				if (validator.definite === true && _ctx === void 0) return false;
			}
			return validateFallback(schema, value, _ctx);
		});
		function validateFallback(schema, value, _ctx) {
			const ctx = _ctx ? {
				..._ctx,
				async: false,
				abortEarly: true
			} : {
				async: false,
				abortEarly: true
			};
			const fallbackRun = schema._zod.bag.fallbackRun;
			let result;
			if (fallbackRun) {
				ctx[COMPILE_FALLBACK] = true;
				result = fallbackRun({
					value,
					issues: []
				}, ctx);
			} else result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length === 0;
		}
		const validateAsync$1 = async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true,
				abortEarly: true
			} : {
				async: true,
				abortEarly: true
			};
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length === 0;
		};
		const _encode = (_Err) => {
			const parse = _parse(_Err);
			const fn = (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return parse(schema, value, ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _decode = (_Err) => {
			const parse = _parse(_Err);
			const fn = (schema, value, _ctx, _params) => {
				return parse(schema, value, _ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _encodeAsync = (_Err) => {
			const parseAsync = _parseAsync(_Err);
			const fn = async (schema, value, _ctx, _params) => {
				const ctx = _ctx ? {
					..._ctx,
					direction: "backward"
				} : { direction: "backward" };
				return await parseAsync(schema, value, ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _decodeAsync = (_Err) => {
			const parseAsync = _parseAsync(_Err);
			const fn = async (schema, value, _ctx, _params) => {
				return await parseAsync(schema, value, _ctx, finalizeParams(fn, _params));
			};
			return fn;
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		function nanoidOfLength(length) {
			return new RegExp(`^[a-zA-Z0-9_-]{${length}}$`);
		}
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		/** Anchors a pattern source. The interpolation lives here rather than at the call site because
		* esbuild will not drop a `@__PURE__` call whose own argument interpolates a variable, but it
		* will drop `anchor(dateSource)`. Keeping it inline pinned `date` into every bundle. */
		function anchor(source) {
			return new RegExp(`^${source}$`);
		}
		const date = /*@__PURE__*/ anchor(dateSource);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : args.seconds ? `${hhmm}:[0-5]\\d(?:\\.\\d+)?` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime(args) {
			const opts = ["Z"];
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const qualified = `${timeSource({
				precision: args.precision,
				seconds: true
			})}(?:${opts.join("|")})`;
			const timeRegex = args.local ? `${qualified}|${timeSource({ precision: args.precision })}` : qualified;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const anyString = /^[\s\S]{0,}$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		/** Default `when` for length-based checks: run only on non-nullish values with a `length`. */
		const _whenHasLength = (payload) => {
			const val = payload.value;
			return !nullish(val) && val.length !== void 0;
		};
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin: numericOriginMap[typeof payload.value] ?? origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin: numericOriginMap[typeof payload.value] ?? origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? def.value !== BigInt(0) && payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				if ((typeof input === "string" && units > def.maximum ? codePointLength(input) : units) <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				if ((typeof input === "string" && units >= def.minimum && units < def.minimum * 2 ? codePointLength(input) : units) >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = _whenHasLength);
			inst._zod.check = (payload) => {
				const input = payload.value;
				const units = input.length;
				const length = typeof input === "string" && units >= def.length && units <= def.length * 2 ? codePointLength(input) : units;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			def.pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position},}${escapedRegex}` : escapedRegex);
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = [], closed = {}) {
				this.content = [];
				this.indent = 0;
				this.args = args;
				this.closed = closed;
			}
			indented(fn) {
				this.indent += 1;
				try {
					fn(this);
				} finally {
					this.indent -= 1;
				}
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const content = this?.content ?? [``];
				return new F(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${content.join("\n")}\n};`)(...Object.values(this.closed));
			}
		};
		//#endregion
		//#region node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 6,
			patch: 7
		};
		//#endregion
		//#region node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const defChecks = inst._zod.def.checks;
			const checks = inst._zod.traits.has("$ZodCheck") ? [inst, ...defChecks ?? []] : defChecks?.length ? [...defChecks] : [];
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					if (payload.memo) return payload;
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							attachSchema(payload.issues, currLen, inst);
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							attachSchema(payload.issues, currLen, inst);
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
		}, {
			get "~standard"() {
				return hide(this, "~standard", standardProps(this));
			},
			set "~standard"(value) {
				own(this, "~standard", value);
			}
		});
		/** The Standard Schema surface for `inst`. Shared so wrappers can extend it without forcing it. */
		const toStandardResult = (r, ctx) => r.issues.length ? { issues: r.issues.map((iss) => finalizeIssue(iss, ctx, config())) } : { value: r.value };
		async function validateAsync(inst, value) {
			const ctx = { async: true };
			return toStandardResult(await inst._zod.run({
				value,
				issues: []
			}, ctx), ctx);
		}
		function standardProps(inst) {
			return {
				validate: (value) => {
					const ctx = { async: false };
					try {
						const r = inst._zod.run({
							value,
							issues: []
						}, ctx);
						if (!(r instanceof Promise)) return toStandardResult(r, ctx);
					} catch (_) {}
					return validateAsync(inst, value);
				},
				vendor: "zod",
				version: 1
			};
		}
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = def.pattern ?? anyString;
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		function canParseURL(input) {
			try {
				if (typeof URL !== "undefined" && typeof URL.canParse === "function") return URL.canParse(input);
				new URL(input);
				return true;
			} catch {
				return false;
			}
		}
		function validateURL(trimmed, def) {
			if (!("normalize" in def) && !("hostname" in def) && !("protocol" in def)) return canParseURL(trimmed) || 2;
			return parseURLObject(trimmed, def);
		}
		/** Parses a URL while preserving the non-normalizing HTTP guard. */
		function parseURLObject(trimmed, def) {
			if (!def.normalize && def.protocol?.source === httpProtocol.source && !/^https?:\/\//i.test(trimmed)) return 1;
			try {
				if (typeof URL !== "undefined") {
					const URLStatic = URL;
					if (typeof URLStatic.parse === "function") return URLStatic.parse(trimmed) ?? 2;
				}
				return new URL(trimmed);
			} catch {
				return 2;
			}
		}
		const asciiTabOrNewline = /[\t\n\r]/g;
		/** The URL parser deletes every ASCII tab, LF and CR from its input before it parses, so `new URL("https://exa\nmple.com")` reports on `example.com`. Applying the same deletion to the returned value closes the half of that divergence which can move the host; the parser's other rewrite, stripping C0 controls at the edges, cannot. */
		function stripTabAndNewline(value) {
			return value.replace(asciiTabOrNewline, "");
		}
		function urlHostnameOk(url, hostname) {
			hostname.lastIndex = 0;
			return hostname.test(url.hostname);
		}
		function urlProtocolOk(url, protocol) {
			protocol.lastIndex = 0;
			return protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol);
		}
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					const url = validateURL(trimmed, def);
					if (url === 1) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid URL format",
							input: payload.value,
							inst,
							continue: !def.abort
						});
						return;
					}
					if (url === 2) {
						payload.issues.push({
							code: "invalid_format",
							format: "url",
							input: payload.value,
							inst,
							continue: !def.abort
						});
						return;
					}
					if (url === true) {
						payload.value = stripTabAndNewline(trimmed);
						return;
					}
					if (def.hostname && !urlHostnameOk(url, def.hostname)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid hostname",
						pattern: def.hostname.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
					if (def.protocol && !urlProtocolOk(url, def.protocol)) payload.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid protocol",
						pattern: def.protocol.source,
						input: payload.value,
						inst,
						continue: !def.abort
					});
					payload.value = def.normalize ? url.href : stripTabAndNewline(trimmed);
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			if (def.length !== void 0 && (!Number.isInteger(def.length) || def.length < 1)) throw new Error(`Invalid nanoid length: ${def.length}`);
			def.pattern ?? (def.pattern = def.length === void 0 ? nanoid : nanoidOfLength(def.length));
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
		});
		/** An IPv6 address is written with hex digits, colons and dots, and nothing else. The guard is what makes the check below an IPv6 check: `new URL("http://[...]")` parses an authority, not an address, so `@` and `\` re-delimit it and `"::@1\\"` validates against the host `0.0.0.1`. The URL parser also deletes ASCII tab, LF and CR rather than failing, which is how `"::1\n"` validated as `::1`. */
		const ipv6Alphabet = /^[0-9a-fA-F:.]+$/;
		function isValidIPv6(value) {
			if (!ipv6Alphabet.test(value)) return false;
			return canParseURL(`http://[${value}]`);
		}
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (!isValidIPv6(payload.value)) payload.issues.push({
					code: "invalid_format",
					format: "ipv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		function isValidCIDRv6(value) {
			const parts = value.split("/");
			if (parts.length !== 2) return false;
			const [address, prefix] = parts;
			if (!prefix) return false;
			const prefixNum = Number(prefix);
			if (`${prefixNum}` !== prefix) return false;
			if (prefixNum < 0 || prefixNum > 128) return false;
			return isValidIPv6(address);
		}
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (!isValidCIDRv6(payload.value)) payload.issues.push({
					code: "invalid_format",
					format: "cidrv6",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const base64Charset = /^[0-9a-zA-Z+/]*={0,2}$/;
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64Charset);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const base64urlCharset = /^[A-Za-z0-9_-]*$/;
		function isValidBase64URL(data) {
			if (!base64urlCharset.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64urlCharset);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? String(input) : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		function capSize(inst, size) {
			const caps = sizeCaps(inst._zod.def.checks);
			if (!caps.length) return;
			const cap = Math.min(...caps.map((c) => c[0]));
			const parse = inst._zod.parse;
			inst._zod.parse = (payload, ctx) => {
				const n = size(payload.value);
				if (n > cap && !ctx?.skipChecks && ctx?.direction !== "backward") {
					for (const [max, ch] of sizeCaps(inst._zod.def.checks)) if (n > max && ch._zod.def.when(payload)) {
						const start = payload.issues.length;
						ch._zod.check(payload);
						payload.issues[start].continue = false;
						attachSchema(payload.issues, start, inst);
						return payload;
					}
				}
				return parse(payload, ctx);
			};
		}
		const arraySize = (input) => Array.isArray(input) ? input.length : -1;
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			const memo = globalConfig.memoizer;
			memo?.attach(inst);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = memo ? memo.alloc(inst, payload, Array(input.length), ctx) : Array(input.length);
				const proms = [];
				const abortEarly = ctx?.abortEarly;
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else {
						handleArrayResult(result, payload, i);
						if (abortEarly && result.issues.length !== 0 && aborted(result)) break;
					}
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
			capSize(inst, arraySize);
		});
		function handlePropertyResult(result, final, key, input, optin, optout) {
			const isPresent = key in input;
			const isOptionalOut = optout === "optional";
			if (!isPresent && isOptionalOut && optin === "optional") return;
			if (result.issues.length) {
				if (optin !== void 0 && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && optin === void 0) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent || optin === "defaulted" && !isOptionalOut) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		const NO_SYMBOL_KEYS = [];
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			const ownSymbols = Object.getOwnPropertySymbols(def.shape);
			const symbolKeys = ownSymbols.length ? ownSymbols : NO_SYMBOL_KEYS;
			const allKeys = symbolKeys.length ? [...keys, ...symbolKeys] : keys;
			for (const k of allKeys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${String(k)}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				allKeys,
				symbolKeys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst, abortEarly) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const optin = _catchall.optin;
			const optout = _catchall.optout;
			let seen = 0;
			for (const key in input) {
				if (abortEarly && payload.issues.length !== seen) {
					if (aborted(payload, seen)) break;
					seen = payload.issues.length;
				}
				if (keySet.has(key)) continue;
				if (key === "__proto__") {
					if (t === "never") unrecognized.push(key);
					continue;
				}
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
				else handlePropertyResult(r, payload, key, input, optin, optout);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst,
				continue: true
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			const desc = Object.getOwnPropertyDescriptor(def, "shape");
			const sh = desc?.get ? desc.get.raw : def.shape ?? {};
			if (sh) {
				const get = () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					get.raw = newSh;
					return newSh;
				};
				get.raw = sh;
				Object.defineProperty(def, "shape", { get });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazyInternal(inst, "propValues", (zod) => {
				const shape = zod.def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						if (!Object.prototype.hasOwnProperty.call(propValues, key)) assignProp(propValues, key, /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
						if (field.optin !== void 0) propValues[key].add(void 0);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			const memo = globalConfig.memoizer;
			memo?.attach(inst);
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = memo ? memo.alloc(inst, payload, {}, ctx) : {};
				const proms = [];
				const shape = value.shape;
				const abortEarly = ctx?.abortEarly;
				let seen = payload.issues.length;
				for (const key of value.allKeys) {
					if (abortEarly && payload.issues.length !== seen) {
						if (aborted(payload, seen)) break;
						seen = payload.issues.length;
					}
					if (key === "__proto__") continue;
					const el = shape[key];
					const optin = el._zod.optin;
					const optout = el._zod.optout;
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, optin, optout)));
					else handlePropertyResult(r, payload, key, input, optin, optout);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst, abortEarly === true);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const memo = globalConfig.memoizer;
			const generateFastpass = (shape) => {
				const normalized = _normalized.value;
				const syms = normalized.symbolKeys;
				const doc = new Doc(["payload", "ctx"], {
					shape,
					inst,
					memo,
					syms
				});
				const parseStr = (k) => `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				const prefixStr = (id, k) => `
          let ${id}_ab = false;
          for (let i = 0; i < ${id}.issues.length; i++) {
            const iss = ${id}.issues[i];
            iss.path = iss.path ? [${k}, ...iss.path] : [${k}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${id}_ab = true;
          }
          if (${id}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.allKeys) ids[key] = `key_${counter++}`;
				doc.write(memo ? `const newResult = memo.alloc(inst, payload, {}, ctx);` : `const newResult = {};`);
				for (const key of normalized.allKeys) {
					if (key === "__proto__") continue;
					const id = ids[key];
					const k = typeof key === "symbol" ? `syms[${syms.indexOf(key)}]` : esc(key);
					const isPresent = `${k} in input`;
					const schema = shape[key];
					const optin = schema?._zod?.optin;
					const isOptionalIn = optin !== void 0;
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(k)};`);
					if (isOptionalIn && isOptionalOut) {
						const assign = optin === "optional" ? `${id}_present` : `${id}.value !== undefined || ${id}_present`;
						doc.write(`
        const ${id}_present = ${isPresent};
        if (!${id}.issues.length || ${id}_present) {
          if (${id}.issues.length) {${prefixStr(id, k)}
          }

          if (${assign}) {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					} else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${isPresent};
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${id}_present) {
          newResult[${k}] = ${id}.value;
        }

      `);
					else {
						doc.write(`
        if (${id}.issues.length) {${prefixStr(id, k)}
        }
      `);
						if (optin === "defaulted") doc.write(`newResult[${k}] = ${id}.value;`);
						else doc.write(`
        if (${id}.value !== undefined || ${isPresent}) {
          newResult[${k}] = ${id}.value;
        }
      `);
					}
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				return doc.compile();
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst, ctx?.abortEarly === true);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.options.some((o) => o._zod.optin === "defaulted") ? "defaulted" : zod.def.options.some((o) => o._zod.optin !== void 0) ? "optional" : void 0);
			defineLazyInternal(inst, "optout", (zod) => zod.def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazyInternal(inst, "values", (zod) => {
				if (zod.def.options.every((o) => o._zod.values)) return new Set(zod.def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazyInternal(inst, "pattern", (zod) => {
				if (zod.def.options.every((o) => o._zod.pattern)) {
					const patterns = zod.def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				if (Object.prototype.hasOwnProperty.call(newObj, "__proto__")) delete newObj.__proto__;
				for (const key of sharedKeys) {
					if (key === "__proto__") continue;
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			const keyIssues = /* @__PURE__ */ new Map();
			const collect = (iss, side) => {
				let keys;
				if (iss.code === "unrecognized_keys" && !iss.path?.length) {
					unrecIssue ?? (unrecIssue = iss);
					keys = iss.keys;
				} else if (iss.code === "invalid_key" && iss.origin === "record" && iss.path?.length === 1) {
					const k = String(iss.path[0]);
					if (!keyIssues.has(k)) keyIssues.set(k, iss);
					keys = [k];
				} else return false;
				for (const k of keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k)[side] = true;
				}
				return true;
			};
			for (const iss of left.issues) if (!collect(iss, "l")) result.issues.push(iss);
			for (const iss of right.issues) if (!collect(iss, "r")) result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length) {
				const aggregated = unrecIssue ? bothKeys.filter((k) => unrecIssue.keys.includes(k)) : [];
				if (aggregated.length) result.issues.push({
					...unrecIssue,
					keys: aggregated
				});
				for (const k of bothKeys) if (!aggregated.includes(k) && keyIssues.has(k)) result.issues.push(keyIssues.get(k));
			}
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) {
				if (aborted(result)) return result;
				throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			}
			result.value = merged.data;
			return result;
		}
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			defineLazyInternal(inst, "pattern", (zod) => {
				const patternValues = getEnumValues(zod.def.entries).filter((k) => propertyKeyTypes.has(typeof k));
				return new RegExp(patternValues.length ? `^(${patternValues.map((o) => escapeRegex(o.toString())).join("|")})$` : "^[^\\s\\S]$");
			});
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			const values = new Set(def.values);
			inst._zod.values = values;
			defineLazyInternal(inst, "pattern", (zod) => {
				const vals = zod.def.values;
				return new RegExp(vals.length ? `^(${vals.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$` : "^[^\\s\\S]$");
			});
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			globalConfig.memoizer?.guard(inst);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				return payload;
			};
		});
		function handleOptionalResult(payload, result) {
			payload.value = result.issues.length ? void 0 : result.value;
			return payload;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
			inst._zod.optout = "optional";
			defineLazyInternal(inst, "values", (zod) => {
				const values = zod.def.innerType._zod.values;
				return values ? /* @__PURE__ */ new Set([...values, void 0]) : void 0;
			});
			defineLazyInternal(inst, "pattern", (zod) => {
				const pattern = zod.def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === void 0) {
					if (def.innerType._zod.optin !== "defaulted") return payload;
					const result = def.innerType._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) return result.then((result) => handleOptionalResult(payload, result));
					return handleOptionalResult(payload, result);
				}
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			defineLazyInternal(inst, "pattern", (zod) => zod.def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
			defineLazyInternal(inst, "pattern", (zod) => {
				const pattern = zod.def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazyInternal(inst, "values", (zod) => {
				return zod.def.innerType._zod.values ? /* @__PURE__ */ new Set([...zod.def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "defaulted";
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "defaulted";
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => {
				const v = zod.def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		function handleCatchResult(payload, result, def, ctx) {
			if (!result.issues.length) {
				payload.value = result.value;
				if (result.memo) payload.memo = true;
				return payload;
			}
			payload.value = def.catchValue({
				...result,
				value: payload.value,
				error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
				input: payload.value
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional");
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType._zod.optout);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run({
					value: payload.value,
					issues: []
				}, ctx);
				if (result instanceof Promise) return result.then((result) => handleCatchResult(payload, result, def, ctx));
				return handleCatchResult(payload, result, def, ctx);
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "values", (zod) => zod.def.in._zod.values);
			defineLazyInternal(inst, "optin", (zod) => zod.def.in._zod.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.out._zod.optout);
			defineLazyInternal(inst, "propValues", (zod) => zod.def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.some((iss) => iss.code !== "unrecognized_keys")) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazyInternal(inst, "propValues", (zod) => zod.def.innerType._zod.propValues);
			defineLazyInternal(inst, "values", (zod) => zod.def.innerType._zod.values);
			defineLazyInternal(inst, "optin", (zod) => zod.def.innerType?._zod?.optin);
			defineLazyInternal(inst, "optout", (zod) => zod.def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			if (!payload.memo) payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region node_modules/zod/v4/core/memoizer.js
		var $ZodCyclicError = class extends Error {
			constructor() {
				super(`Cannot parse a reference cycle that closes through a transform`);
				this.name = "ZodCyclicError";
			}
		};
		/** Keyed off the context object every schema in one parse call already shares. */
		const STATE = "~memo";
		const NO_ISSUES = [];
		function isRef(value) {
			return value !== null && typeof value === "object";
		}
		function cloneIssues(issues) {
			return issues.map((iss) => iss.path ? {
				...iss,
				path: iss.path.slice()
			} : { ...iss });
		}
		const recursive = /*@__PURE__*/ new WeakMap();
		/** What the walk established, in order of certainty: ordered so the strongest answer among children wins. */
		const NONE = 0;
		const ASSUMED = 1;
		const PROVEN = 2;
		/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
		function isRecursive(inst, stack, resolve) {
			const cached = recursive.get(inst);
			if (cached !== void 0) return cached ? PROVEN : NONE;
			if (stack.has(inst)) return PROVEN;
			stack.add(inst);
			let result = NONE;
			const check = (child) => {
				if (result !== PROVEN && child?._zod) {
					const answer = isRecursive(child, stack, resolve);
					if (answer > result) result = answer;
				}
			};
			const shape = (sh, spread) => {
				let answer = NONE;
				for (const key of Reflect.ownKeys(sh)) {
					const desc = Object.getOwnPropertyDescriptor(sh, key);
					if (spread && !desc.enumerable) continue;
					const child = desc.get ? ASSUMED : desc.value?._zod ? isRecursive(desc.value, stack, resolve) : NONE;
					if (child > answer) answer = child;
				}
				return answer;
			};
			const merge = (answer) => {
				if (answer > result) result = answer;
			};
			const def = inst._zod.def;
			switch (def.type) {
				case "object": {
					const raw = rawShape(def);
					merge(raw ? shape(raw, true) : ASSUMED);
					check(def.catchall);
					break;
				}
				case "array":
					check(def.element);
					break;
				case "tuple":
					for (const el of def.items) check(el);
					check(def.rest);
					break;
				case "record":
				case "map":
					check(def.keyType);
					check(def.valueType);
					break;
				case "set":
					check(def.valueType);
					break;
				case "union":
					for (const el of def.options) check(el);
					break;
				case "intersection":
					check(def.left);
					check(def.right);
					break;
				case "optional":
				case "nullable":
				case "default":
				case "prefault":
				case "catch":
				case "readonly":
				case "nonoptional":
				case "promise":
				case "success":
					check(def.innerType);
					break;
				case "pipe":
					check(def.in);
					check(def.out);
					break;
				case "function":
					check(def.input);
					check(def.output);
					break;
				case "lazy": {
					const inner = def._cachedInner ?? (resolve ? inst._zod.innerType : void 0);
					merge(inner ? isRecursive(inner, stack, false) : ASSUMED);
					break;
				}
				case "template_literal":
				case "string":
				case "number":
				case "int":
				case "boolean":
				case "bigint":
				case "symbol":
				case "undefined":
				case "null":
				case "void":
				case "never":
				case "any":
				case "unknown":
				case "date":
				case "nan":
				case "enum":
				case "literal":
				case "file":
				case "transform":
				case "custom": break;
				default: for (const key in def) {
					const desc = Object.getOwnPropertyDescriptor(def, key);
					if (!desc || desc.get) continue;
					const value = desc.value;
					if (!value || typeof value !== "object") continue;
					if (value._zod) check(value);
					else if (Array.isArray(value)) for (const el of value) check(el);
				}
			}
			stack.delete(inst);
			return settle(inst, result);
		}
		/** An assumed answer must not outlive the resolution that settles it, so only a certain one is cached. */
		function settle(inst, answer) {
			if (answer !== ASSUMED) recursive.set(inst, answer === PROVEN);
			return answer;
		}
		function bucketFor(state, inst) {
			let bucket = state.buckets.get(inst);
			if (!bucket) {
				bucket = /* @__PURE__ */ new WeakMap();
				state.buckets.set(inst, bucket);
			}
			return bucket;
		}
		let handoff;
		const open = [];
		const memo = {
			alloc(_inst, payload, empty) {
				const bucket = handoff;
				if (!bucket) return empty;
				handoff = void 0;
				const entry = {
					value: empty,
					issues: null
				};
				bucket.set(payload.value, entry);
				open.push(entry);
				return empty;
			},
			guard(inst) {
				var _a;
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred.push(() => {
					const base = inst._zod.parse;
					const wrapped = (payload, ctx) => {
						if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value)) throw new $ZodCyclicError();
						return base(payload, ctx);
					};
					inst._zod.parse = wrapped;
					if (inst._zod.run === base) inst._zod.run = wrapped;
				});
			},
			attach(inst) {
				var _a;
				let isRecursiveInst;
				let rechecked = false;
				let lastCtx;
				let lastBucket;
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred.push(() => {
					const base = inst._zod.parse;
					const wrapped = (payload, ctx) => {
						if (isRecursiveInst === void 0) {
							const walked = isRecursive(inst, /* @__PURE__ */ new Set(), false);
							if (walked === NONE) {
								inst._zod.parse = base;
								if (inst._zod.run === wrapped) inst._zod.run = base;
								return base(payload, ctx);
							}
							if (walked === PROVEN || rechecked) isRecursiveInst = true;
							else rechecked = true;
						}
						const input = payload.value;
						if (!isRef(input)) return base(payload, ctx);
						let state = ctx[STATE];
						if (!state) {
							state = {
								buckets: /* @__PURE__ */ new WeakMap(),
								backEdges: void 0
							};
							ctx[STATE] = state;
						}
						let bucket;
						if (lastCtx === ctx) bucket = lastBucket;
						else {
							bucket = bucketFor(state, inst);
							lastCtx = ctx;
							lastBucket = bucket;
						}
						const hit = bucket.get(input);
						if (hit) {
							payload.value = hit.value;
							if (hit.issues) {
								if (hit.issues.length) payload.issues.push(...cloneIssues(hit.issues));
							} else {
								payload.memo = true;
								state.backEdges ?? (state.backEdges = /* @__PURE__ */ new WeakSet());
								state.backEdges.add(hit.value);
							}
							return payload;
						}
						handoff = bucket;
						const depth = open.length;
						const result = base(payload, ctx);
						handoff = void 0;
						const entry = open.length > depth ? open.pop() : void 0;
						if (result instanceof Promise) return result.then((r) => {
							if (entry) entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
							return r;
						});
						if (entry) entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
						return result;
					};
					inst._zod.parse = wrapped;
					if (inst._zod.run === base) inst._zod.run = wrapped;
				});
			}
		};
		/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
		function memoizer() {
			return memo;
		}
		/** Whether this value is a node a back-edge resolved to before it finished. */
		function isBackEdge(ctx, value) {
			const backEdges = ctx[STATE]?.backEdges;
			return backEdges !== void 0 && isRef(value) && backEdges.has(value);
		}
		//#endregion
		//#region node_modules/zod/v4/locales/en.js
		const error = () => {
			const Sizable = {
				string: {
					unit: "characters",
					verb: "to have"
				},
				file: {
					unit: "bytes",
					verb: "to have"
				},
				array: {
					unit: "items",
					verb: "to have"
				},
				set: {
					unit: "items",
					verb: "to have"
				},
				map: {
					unit: "entries",
					verb: "to have"
				}
			};
			function getSizing(origin) {
				return Sizable[origin] ?? null;
			}
			const FormatDictionary = {
				regex: "input",
				email: "email address",
				url: "URL",
				emoji: "emoji",
				uuid: "UUID",
				uuidv4: "UUIDv4",
				uuidv6: "UUIDv6",
				nanoid: "nanoid",
				guid: "GUID",
				cuid: "cuid",
				cuid2: "cuid2",
				ulid: "ULID",
				xid: "XID",
				ksuid: "KSUID",
				datetime: "ISO datetime",
				date: "ISO date",
				time: "ISO time",
				duration: "ISO duration",
				ipv4: "IPv4 address",
				ipv6: "IPv6 address",
				mac: "MAC address",
				cidrv4: "IPv4 range",
				cidrv6: "IPv6 range",
				base64: "base64-encoded string",
				base64url: "base64url-encoded string",
				json_string: "JSON string",
				e164: "E.164 number",
				currency_code: "currency code",
				credit_card: "credit card number",
				iban: "IBAN",
				jwt: "JWT",
				template_literal: "input"
			};
			const TypeDictionary = { nan: "NaN" };
			function getTypeName(type, input) {
				if (type === "number" && typeof input === "number" && !Number.isFinite(input)) return String(input);
				return TypeDictionary[type] ?? type;
			}
			return (issue) => {
				switch (issue.code) {
					case "invalid_type": return `Invalid input: expected ${getTypeName(issue.expected)}, received ${getTypeName(parsedType(issue.input), issue.input)}`;
					case "invalid_value":
						if (issue.values.length === 1) return `Invalid input: expected ${stringifyPrimitive(issue.values[0])}`;
						return `Invalid option: expected one of ${joinValues(issue.values, "|")}`;
					case "too_big": {
						const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
						const sizing = getSizing(issue.origin);
						if (sizing) return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
						return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
					}
					case "too_small": {
						const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
						const sizing = getSizing(issue.origin);
						if (sizing) return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
						return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
					}
					case "invalid_format": {
						const _issue = issue;
						if (_issue.format === "starts_with") return `Invalid string: must start with "${_issue.prefix}"`;
						if (_issue.format === "ends_with") return `Invalid string: must end with "${_issue.suffix}"`;
						if (_issue.format === "includes") return `Invalid string: must include "${_issue.includes}"`;
						if (_issue.format === "regex") return `Invalid string: must match pattern ${_issue.pattern}`;
						return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
					}
					case "not_multiple_of": return `Invalid number: must be a multiple of ${issue.divisor}`;
					case "unrecognized_keys": return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${joinValues(issue.keys, ", ")}`;
					case "invalid_key": return `Invalid key in ${issue.origin}`;
					case "invalid_union":
						if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) return `Invalid discriminator value. Expected ${issue.options.map((o) => `'${o}'`).join(" | ")}`;
						if (issue.inclusive === false) return "Invalid input: more than one option matched";
						return "Invalid input";
					case "invalid_element": return `Invalid value in ${issue.origin}`;
					default: return `Invalid input`;
				}
			};
		};
		function en_default() {
			return { localeError: error() };
		}
		//#endregion
		//#region node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region node_modules/zod/v4/core/api.js
		function snapshotChecks(def) {
			if (def.checks) def.checks = [...def.checks];
			return def;
		}
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class(snapshotChecks({
				type: "string",
				...normalizeParams(params)
			}));
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class(snapshotChecks({
				type: "number",
				checks: [],
				...normalizeParams(params)
			}));
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						if (!("input" in _issue)) _issue.input = payload.value;
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region node_modules/zod/v4/core/to-json-schema.js
		function assignProps(target, ...sources) {
			for (const source of sources) for (const key of Reflect.ownKeys(source)) if (Object.prototype.propertyIsEnumerable.call(source, key)) assignProp(target, key, source[key]);
			return target;
		}
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				sharedDefsExtractedFor: void 0,
				sharedEmitDoneFor: void 0,
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				intersections: [],
				deferred: [],
				external: params?.external ?? void 0
			};
		}
		/**
		* Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
		* `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
		* custom JSON Schema was written into `json`, in which case the caller must not write its own.
		*/
		function handleUnrepresentable(schema, ctx, json, params, message) {
			const result = typeof ctx.unrepresentable === "function" ? ctx.unrepresentable({
				zodSchema: schema,
				path: params.path,
				message
			}) : ctx.unrepresentable;
			if (result === "any") return false;
			if (result === void 0 || result === "throw") throw new Error(message);
			Object.assign(json, result);
			return true;
		}
		function processSchema(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			ctx.sharedDefsExtractedFor = void 0;
			ctx.sharedEmitDoneFor = void 0;
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					processSchema(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) assignProps(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function encodeJSONPointerSegment(segment) {
			return segment.replace(/~/g, "~0").replace(/\//g, "~1");
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external) return;
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}`
					};
				}
				const uriPrefix = `#`;
				const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
				if (entry[1] === root && !entry[1].schema.id) return { ref: uriPrefix };
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + encodeJSONPointerSegment(defId)
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") extractToDef(entry);
				}
			}
			if (ctx.external) ctx.sharedDefsExtractedFor = ctx.external;
		}
		/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
		function compactTypeUnion(schema) {
			const options = schema.anyOf;
			if (!Array.isArray(options) || options.length === 0 || schema.type !== void 0) return;
			const types = [];
			for (const option of options) {
				if (!option || typeof option !== "object") return;
				compactTypeUnion(option);
				const keys = Object.keys(option);
				if (keys.length !== 1 || keys[0] !== "type") return;
				const type = option.type;
				for (const member of Array.isArray(type) ? type : [type]) {
					if (typeof member !== "string") return;
					if (!types.includes(member)) types.push(member);
				}
			}
			delete schema.anyOf;
			schema.type = types.length === 1 ? types[0] : types;
		}
		/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
		* an annotation like `description` — makes a member unfoldable, so a constraint this does not
		* understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
		const FOLDABLE_KEYS = /* @__PURE__ */ new Set([
			"type",
			"properties",
			"required",
			"additionalProperties"
		]);
		const UNION_KEYS = ["oneOf", "anyOf"];
		/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
		function undeclaredConstraint(member) {
			const extra = member.additionalProperties;
			if (extra === void 0 || extra === false || typeof extra !== "object" || extra === null) return null;
			return Object.keys(extra).length ? extra : null;
		}
		/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
		function foldObjects(members) {
			const objects = [];
			for (const member of members) {
				if (typeof member !== "object" || member.type !== "object") return null;
				for (const key in member) if (!FOLDABLE_KEYS.has(key)) return null;
				objects.push(member);
			}
			const properties = {};
			const required = /* @__PURE__ */ new Set();
			for (const object of objects) {
				for (const key in object.properties) {
					if (Object.prototype.hasOwnProperty.call(properties, key)) continue;
					const parts = [];
					for (const other of objects) {
						const part = other.properties?.[key] ?? undeclaredConstraint(other);
						if (part === null || part === void 0) continue;
						if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part))) parts.push(part);
					}
					assignProp(properties, key, parts.length === 1 ? parts[0] : foldObjects(parts) ?? { allOf: parts });
				}
				for (const key of object.required ?? []) required.add(key);
			}
			const folded = {
				type: "object",
				properties
			};
			if (required.size) folded.required = [...required];
			if (objects.every((object) => object.additionalProperties === false)) folded.additionalProperties = false;
			else {
				const constraints = [];
				for (const object of objects) {
					const constraint = undeclaredConstraint(object);
					if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint))) constraints.push(constraint);
				}
				if (constraints.length === 1) folded.additionalProperties = constraints[0];
				else if (constraints.length > 1) folded.additionalProperties = { allOf: constraints };
			}
			return folded;
		}
		/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
		* closed object members reject each other's keys and the schema validates nothing. Zod's parser
		* pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
		* *every* side rejects it — so the emitted schema has to pool them too, and folding the members
		* into one object is the encoding that says so on every target.
		*
		* This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
		* machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
		* keeps its reference and its own closedness rather than being inlined as a stale copy. */
		function foldIntersection(json) {
			const allOf = json.allOf;
			if (!Array.isArray(allOf) || allOf.length < 2) return;
			for (const key of FOLDABLE_KEYS) if (key in json) return;
			const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
			let folded = null;
			if (!unions.length) folded = foldObjects(allOf);
			else {
				const union = unions[0];
				const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
				if (Object.keys(union).length !== 1) return;
				const rest = allOf.filter((m) => m !== union);
				const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
				if (branches.some((b) => !b)) return;
				folded = { [keyword]: branches };
			}
			if (!folded) return;
			delete json.allOf;
			assignProps(json, folded);
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else assignProps(schema, refSchema);
					assignProps(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
				for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
				if (ctx.target !== "openapi-3.0") for (const entry of ctx.seen.entries()) compactTypeUnion(entry[1].def ?? entry[1].schema);
				for (const rewrite of ctx.deferred) rewrite();
				if (ctx.intersections.length) {
					const carriers = /* @__PURE__ */ new Map();
					for (const seen of ctx.seen.values()) for (const json of [seen.schema, seen.def]) {
						const allOf = json?.allOf;
						if (!Array.isArray(allOf)) continue;
						const existing = carriers.get(allOf);
						if (existing) existing.push(json);
						else carriers.set(allOf, [json]);
					}
					for (const allOf of ctx.intersections) for (const json of carriers.get(allOf) ?? []) foldIntersection(json);
				}
			}
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			assignProps(result, root.defId ? root.schema : root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					assignProp(defs, seen.defId, seen.def);
				}
			}
			if (ctx.external) ctx.sharedEmitDoneFor = ctx.external;
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault" || def.type === "catch") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			processSchema(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			processSchema(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region node_modules/zod/v4/core/json-schema-processors.js
		const narrowMin = (agg, key, value) => {
			if (agg[key] === void 0 || value > agg[key]) agg[key] = value;
		};
		const narrowMax = (agg, key, value) => {
			if (agg[key] === void 0 || value < agg[key]) agg[key] = value;
		};
		const narrowBoth = (agg, value) => {
			narrowMin(agg, "minimum", value);
			narrowMax(agg, "maximum", value);
		};
		const addDivisor = (agg, value) => {
			agg.multipleOf ?? (agg.multipleOf = []);
			if (!agg.multipleOf.includes(value)) agg.multipleOf.push(value);
		};
		const addPattern = (agg, pattern) => {
			agg.patterns ?? (agg.patterns = /* @__PURE__ */ new Set());
			agg.patterns.add(pattern);
		};
		const intersectMime = (agg, mime) => {
			agg.mime = agg.mime ? agg.mime.filter((m) => mime.includes(m)) : [...mime];
		};
		const setFormat = (agg, format) => {
			agg.format = format;
			if (format.includes("int")) agg.isInt = true;
		};
		const minContributor = (agg, def) => narrowMin(agg, "minimum", def.minimum);
		const maxContributor = (agg, def) => narrowMax(agg, "maximum", def.maximum);
		const formatContributor = (ranges) => (agg, def) => {
			setFormat(agg, def.format);
			const [minimum, maximum] = ranges[def.format];
			narrowMin(agg, "minimum", minimum);
			narrowMax(agg, "maximum", maximum);
		};
		const contributors = {
			greater_than: (agg, def) => narrowMin(agg, def.inclusive ? "minimum" : "exclusiveMinimum", def.value),
			less_than: (agg, def) => narrowMax(agg, def.inclusive ? "maximum" : "exclusiveMaximum", def.value),
			multiple_of: (agg, def) => addDivisor(agg, def.value),
			number_format: formatContributor(NUMBER_FORMAT_RANGES),
			bigint_format: formatContributor(BIGINT_FORMAT_RANGES),
			min_length: minContributor,
			max_length: maxContributor,
			length_equals: (agg, def) => narrowBoth(agg, def.length),
			min_size: minContributor,
			max_size: maxContributor,
			size_equals: (agg, def) => narrowBoth(agg, def.size),
			string_format: (agg, def) => {
				setFormat(agg, def.format);
				if (def.pattern) addPattern(agg, def.pattern);
				if (def.format === "base64" || def.format === "base64url") agg.contentEncoding = def.format;
				if (def.local || def.precision === -1) agg.laxFormat = true;
			},
			mime_type: (agg, def) => intersectMime(agg, def.mime)
		};
		function aggregateChecks(schema) {
			const agg = {};
			const def = schema._zod.def;
			const list = schema._zod.traits.has("$ZodCheck") ? [schema, ...def.checks ?? []] : def.checks ?? [];
			for (const ch of list) contributors[ch._zod.def.check]?.(agg, ch._zod.def);
			const bag = schema._zod.bag;
			if (bag.minimum !== void 0) narrowMin(agg, "minimum", bag.minimum);
			if (bag.exclusiveMinimum !== void 0) narrowMin(agg, "exclusiveMinimum", bag.exclusiveMinimum);
			if (bag.maximum !== void 0) narrowMax(agg, "maximum", bag.maximum);
			if (bag.exclusiveMaximum !== void 0) narrowMax(agg, "exclusiveMaximum", bag.exclusiveMaximum);
			if (bag.multipleOf !== void 0) addDivisor(agg, bag.multipleOf);
			if (bag.format !== void 0) {
				agg.format ?? (agg.format = bag.format);
				if (bag.format.includes("int")) agg.isInt = true;
			}
			if (bag.mime) intersectMime(agg, bag.mime);
			for (const pattern of bag.patterns ?? []) addPattern(agg, pattern);
			return agg;
		}
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const exactPatterns = /* @__PURE__ */ new Map([[base64Charset, base64], [base64urlCharset, base64url]]);
		const exactPattern = (p) => exactPatterns.get(p) ?? p;
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = aggregateChecks(schema);
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time" || laxFormat) delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const patternList = [...patterns].map(exactPattern);
				if (patternList.length === 1) json.pattern = patternList[0].source;
				else if (patternList.length > 1) json.allOf = [...patternList.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const { minimum, maximum, multipleOf, exclusiveMaximum, exclusiveMinimum, isInt } = aggregateChecks(schema);
			json.type = isInt ? "integer" : "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (multipleOf) {
				const divisors = /* @__PURE__ */ new Set();
				for (const divisor of multipleOf) if (Number.isFinite(divisor) && divisor !== 0) divisors.add(Math.abs(divisor));
				else handleUnrepresentable(schema, ctx, json, params, `A multipleOf divisor of ${divisor} cannot be represented in JSON Schema`);
				const [first, ...rest] = divisors;
				if (first !== void 0) json.multipleOf = first;
				if (rest.length) json.allOf = [...json.allOf ?? [], ...rest.map((m) => ({ multipleOf: m }))];
			}
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.length === 0) {
				json.not = {};
				return;
			}
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			if (def.values.length === 0) {
				json.not = {};
				return;
			}
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (handleUnrepresentable(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema")) return;
			} else if (typeof val === "bigint") {
				if (handleUnrepresentable(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema")) return;
				vals.push(Number(val));
			} else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (schema, ctx, json, params) => {
			handleUnrepresentable(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (schema, ctx, json, params) => {
			handleUnrepresentable(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = aggregateChecks(schema);
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = processSchema(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		function inputOptin(schema) {
			const def = schema._zod.def;
			if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) return inputOptin(def.out);
			if (def.type === "catch") return inputOptin(def.innerType);
			return schema._zod.optin;
		}
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const shape = def.shape;
			if (Object.getOwnPropertySymbols(shape).length && handleUnrepresentable(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) return;
			json.type = "object";
			json.properties = {};
			for (const key in shape) assignProp(json.properties, key, processSchema(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			}));
			const requiredKeys = [];
			for (const key of Object.keys(shape)) {
				const field = def.shape[key];
				if (ctx.io === "input" ? inputOptin(field) === void 0 : field._zod.optout === void 0) requiredKeys.push(key);
			}
			if (requiredKeys.length > 0) json.required = requiredKeys;
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = processSchema(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => processSchema(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = processSchema(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = processSchema(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			const allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
			json.allOf = allOf;
			ctx.intersections.push(allOf);
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
		* A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
		* unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
		const UNREPRESENTABLE_DEFAULT = Symbol();
		function serializeDefaultValue(value, schema, ctx, json, params) {
			let unrepresentable = false;
			const serialized = JSON.stringify(value, (_, val) => {
				if (typeof val !== "bigint") return val;
				unrepresentable = true;
				return null;
			});
			if (!unrepresentable) return JSON.parse(serialized);
			handleUnrepresentable(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
			return UNREPRESENTABLE_DEFAULT;
		}
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
			if (value !== UNREPRESENTABLE_DEFAULT) json.default = value;
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io !== "input") return;
			const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
			if (value !== UNREPRESENTABLE_DEFAULT) json._prefault = value;
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				handleUnrepresentable(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
				return;
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			processSchema(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			processSchema(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region node_modules/zod/v4/classic/errors.js
		const _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
		function _lazyMethod(proto, key, make) {
			Object.defineProperty(proto, key, {
				configurable: true,
				enumerable: false,
				get() {
					const value = make(this);
					Object.defineProperty(this, key, {
						value,
						configurable: true,
						writable: true
					});
					return value;
				},
				set(value) {
					Object.defineProperty(this, key, {
						value,
						configurable: true,
						writable: true
					});
				}
			});
		}
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			const proto = Object.getPrototypeOf(inst);
			if (_installedErrorProtos.has(proto)) return;
			_installedErrorProtos.add(proto);
			_lazyMethod(proto, "format", (self) => (mapper) => formatError(self, mapper));
			_lazyMethod(proto, "flatten", (self) => (mapper) => flattenError(self, mapper));
			_lazyMethod(proto, "addIssue", (self) => (issue) => {
				self.issues.push(issue);
				self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
			});
			_lazyMethod(proto, "addIssues", (self) => (issues) => {
				self.issues.push(...issues);
				self.message = JSON.stringify(self.issues, jsonStringifyReplacer, 2);
			});
			Object.defineProperty(proto, "isEmpty", {
				configurable: true,
				enumerable: false,
				get() {
					return this.issues.length === 0;
				}
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, void 0, { Parent: Error });
		//#endregion
		//#region node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region node_modules/zod/v4/classic/schemas.js
		function _ensureDefaultLocale() {
			if (!globalConfig.localeError) config(en_default());
		}
		function _ensureDefaultMemoizer() {
			if (!globalConfig.memoizer) config({ memoizer: memoizer() });
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			_ensureDefaultLocale();
			$ZodType.init(inst, def);
			inst.def = def;
			inst.type = def.type;
			return inst;
		}, {
			check(...chks) {
				const def = this.def;
				return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
					check: ch,
					def: { check: "custom" },
					onattach: []
				} } : ch)] }), { parent: true });
			},
			with(...chks) {
				return this.check(...chks);
			},
			clone(def, params) {
				return clone(this, def, params);
			},
			brand() {
				return this;
			},
			register(reg, meta) {
				reg.add(this, meta);
				return this;
			},
			refine(check, params) {
				return this.check(refine(check, params));
			},
			superRefine(refinement, params) {
				return this.check(superRefine(refinement, params));
			},
			overwrite(fn) {
				return this.check(/* @__PURE__ */ _overwrite(fn));
			},
			optional() {
				return optional(this);
			},
			exactOptional() {
				return exactOptional(this);
			},
			nullable() {
				return nullable(this);
			},
			nullish() {
				return optional(nullable(this));
			},
			nonoptional(params) {
				return nonoptional(this, params);
			},
			array() {
				return array(this);
			},
			or(arg) {
				return union([this, arg]);
			},
			and(arg) {
				return intersection(this, arg);
			},
			transform(tx) {
				return pipe(this, transform(tx));
			},
			default(d) {
				return _default(this, d);
			},
			prefault(d) {
				return prefault(this, d);
			},
			catch(params) {
				return _catch(this, params);
			},
			pipe(target) {
				return pipe(this, target);
			},
			readonly() {
				return readonly(this);
			},
			describe(description) {
				const cl = this.clone();
				globalRegistry.add(cl, { description });
				return cl;
			},
			meta(...args) {
				if (args.length === 0) return globalRegistry.get(this);
				const cl = this.clone();
				globalRegistry.add(cl, args[0]);
				return cl;
			},
			isOptional() {
				return this.safeParse(void 0).success;
			},
			isNullable() {
				return this.safeParse(null).success;
			},
			apply(fn, ...args) {
				return args.length === 0 ? fn(this) : fn(this, ...args);
			},
			get "~standard"() {
				return hide(this, "~standard", {
					...standardProps(this),
					jsonSchema: {
						input: createStandardJSONSchemaMethod(this, "input"),
						output: createStandardJSONSchemaMethod(this, "output")
					}
				});
			},
			set "~standard"(value) {
				own(this, "~standard", value);
			},
			parse: function _parse(data, params) {
				return parse(this, data, params, { callee: _parse });
			},
			parseAsync: async function _parseAsync(data, params) {
				return await parseAsync(this, data, params, { callee: _parseAsync });
			},
			safeParse(data, params) {
				return safeParse(this, data, params);
			},
			async safeParseAsync(data, params) {
				return safeParseAsync(this, data, params);
			},
			get spa() {
				return this?.safeParseAsync;
			},
			set spa(value) {
				own(this, "spa", value);
			},
			validate(data, params) {
				return validate(this, data, params);
			},
			validateAsync(data, params) {
				return validateAsync$1(this, data, params);
			},
			encode: function _encode(data, params) {
				return encode(this, data, params, { callee: _encode });
			},
			decode: function _decode(data, params) {
				return decode(this, data, params, { callee: _decode });
			},
			encodeAsync: async function _encodeAsync(data, params) {
				return await encodeAsync(this, data, params, { callee: _encodeAsync });
			},
			decodeAsync: async function _decodeAsync(data, params) {
				return await decodeAsync(this, data, params, { callee: _decodeAsync });
			},
			safeEncode(data, params) {
				return safeEncode(this, data, params);
			},
			safeDecode(data, params) {
				return safeDecode(this, data, params);
			},
			async safeEncodeAsync(data, params) {
				return safeEncodeAsync(this, data, params);
			},
			async safeDecodeAsync(data, params) {
				return safeDecodeAsync(this, data, params);
			},
			toJSONSchema(params) {
				return createToJSONSchemaMethod(this, {})(params);
			},
			get description() {
				return globalRegistry.get(this)?.description;
			},
			get _def() {
				return this._zod.def;
			}
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
		}, /*@__PURE__*/ derived({
			format: (inst) => aggregateChecks(inst).format ?? null,
			minLength: (inst) => aggregateChecks(inst).minimum ?? null,
			maxLength: (inst) => aggregateChecks(inst).maximum ?? null
		}, {
			regex(...args) {
				return this.check(/* @__PURE__ */ _regex(...args));
			},
			includes(...args) {
				return this.check(/* @__PURE__ */ _includes(...args));
			},
			startsWith(...args) {
				return this.check(/* @__PURE__ */ _startsWith(...args));
			},
			endsWith(...args) {
				return this.check(/* @__PURE__ */ _endsWith(...args));
			},
			min(...args) {
				return this.check(/* @__PURE__ */ _minLength(...args));
			},
			max(...args) {
				return this.check(/* @__PURE__ */ _maxLength(...args));
			},
			length(...args) {
				return this.check(/* @__PURE__ */ _length(...args));
			},
			nonempty(...args) {
				return this.check(/* @__PURE__ */ _minLength(1, ...args));
			},
			lowercase(params) {
				return this.check(/* @__PURE__ */ _lowercase(params));
			},
			uppercase(params) {
				return this.check(/* @__PURE__ */ _uppercase(params));
			},
			trim() {
				return this.check(/* @__PURE__ */ _trim());
			},
			normalize(...args) {
				return this.check(/* @__PURE__ */ _normalize(...args));
			},
			toLowerCase() {
				return this.check(/* @__PURE__ */ _toLowerCase());
			},
			toUpperCase() {
				return this.check(/* @__PURE__ */ _toUpperCase());
			},
			slugify() {
				return this.check(/* @__PURE__ */ _slugify());
			}
		}));
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
		}, {
			email(params) {
				return this.check(/* @__PURE__ */ _email(ZodEmail, params));
			},
			url(params) {
				return this.check(/* @__PURE__ */ _url(ZodURL, params));
			},
			jwt(params) {
				return this.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			},
			emoji(params) {
				return this.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			},
			guid(params) {
				return this.check(/* @__PURE__ */ _guid(ZodGUID, params));
			},
			uuid(params) {
				return this.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			},
			uuidv4(params) {
				return this.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			},
			uuidv6(params) {
				return this.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			},
			uuidv7(params) {
				return this.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			},
			nanoid(params) {
				return this.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			},
			cuid(params) {
				return this.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			},
			cuid2(params) {
				return this.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			},
			ulid(params) {
				return this.check(/* @__PURE__ */ _ulid(ZodULID, params));
			},
			base64(params) {
				return this.check(/* @__PURE__ */ _base64(ZodBase64, params));
			},
			base64url(params) {
				return this.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			},
			xid(params) {
				return this.check(/* @__PURE__ */ _xid(ZodXID, params));
			},
			ksuid(params) {
				return this.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			},
			ipv4(params) {
				return this.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			},
			ipv6(params) {
				return this.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			},
			cidrv4(params) {
				return this.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			},
			cidrv6(params) {
				return this.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			},
			e164(params) {
				return this.check(/* @__PURE__ */ _e164(ZodE164, params));
			},
			datetime(params) {
				return this.check(/* @__PURE__ */ _isoDateTime(ZodISODateTime, params));
			},
			date(params) {
				return this.check(/* @__PURE__ */ _isoDate(ZodISODate, params));
			},
			time(params) {
				return this.check(/* @__PURE__ */ _isoTime(ZodISOTime, params));
			},
			duration(params) {
				return this.check(/* @__PURE__ */ _isoDuration(ZodISODuration, params));
			}
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			inst.isFinite = true;
		}, /*@__PURE__*/ derived({
			minValue: (inst) => {
				const { minimum, exclusiveMinimum } = aggregateChecks(inst);
				return Math.max(minimum ?? Number.NEGATIVE_INFINITY, exclusiveMinimum ?? Number.NEGATIVE_INFINITY);
			},
			maxValue: (inst) => {
				const { maximum, exclusiveMaximum } = aggregateChecks(inst);
				return Math.min(maximum ?? Number.POSITIVE_INFINITY, exclusiveMaximum ?? Number.POSITIVE_INFINITY);
			},
			isInt: (inst) => {
				const { isInt, multipleOf } = aggregateChecks(inst);
				return !!isInt || !!multipleOf?.some(Number.isSafeInteger);
			},
			format: (inst) => aggregateChecks(inst).format ?? null
		}, {
			gt(value, params) {
				return this.check(/* @__PURE__ */ _gt(value, params));
			},
			gte(value, params) {
				return this.check(/* @__PURE__ */ _gte(value, params));
			},
			min(value, params) {
				return this.check(/* @__PURE__ */ _gte(value, params));
			},
			lt(value, params) {
				return this.check(/* @__PURE__ */ _lt(value, params));
			},
			lte(value, params) {
				return this.check(/* @__PURE__ */ _lte(value, params));
			},
			max(value, params) {
				return this.check(/* @__PURE__ */ _lte(value, params));
			},
			int(params) {
				return this.check(int(params));
			},
			safe(params) {
				return this.check(int(params));
			},
			positive(params) {
				return this.check(/* @__PURE__ */ _gt(0, params));
			},
			nonnegative(params) {
				return this.check(/* @__PURE__ */ _gte(0, params));
			},
			negative(params) {
				return this.check(/* @__PURE__ */ _lt(0, params));
			},
			nonpositive(params) {
				return this.check(/* @__PURE__ */ _lte(0, params));
			},
			multipleOf(value, params) {
				return this.check(/* @__PURE__ */ _multipleOf(value, params));
			},
			step(value, params) {
				return this.check(/* @__PURE__ */ _multipleOf(value, params));
			},
			finite() {
				return this;
			}
		}));
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
		}, {
			min(n, params) {
				return this.check(/* @__PURE__ */ _minLength(n, params));
			},
			nonempty(params) {
				return this.check(/* @__PURE__ */ _minLength(1, params));
			},
			max(n, params) {
				return this.check(/* @__PURE__ */ _maxLength(n, params));
			},
			length(n, params) {
				return this.check(/* @__PURE__ */ _length(n, params));
			},
			unwrap() {
				return this.element;
			}
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
		}, {
			keyof() {
				return _enum(Object.keys(this._zod.def.shape));
			},
			catchall(catchall) {
				return this.clone(mergeDefs(this._zod.def, { catchall }));
			},
			passthrough() {
				return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
			},
			loose() {
				return this.clone(mergeDefs(this._zod.def, { catchall: unknown() }));
			},
			strict() {
				return this.clone(mergeDefs(this._zod.def, { catchall: never() }));
			},
			strip() {
				return this.clone(mergeDefs(this._zod.def, { catchall: void 0 }));
			},
			extend(incoming) {
				return extend(this, incoming);
			},
			safeExtend(incoming) {
				return safeExtend(this, incoming);
			},
			merge(other) {
				return merge(this, other);
			},
			pick(mask) {
				return pick(this, mask);
			},
			omit(mask) {
				return omit(this, mask);
			},
			partial(...args) {
				return partial(ZodOptional, this, args[0]);
			},
			exactPartial(...args) {
				return partial(ZodExactOptional, this, args[0], "exactPartial");
			},
			required(...args) {
				return required(ZodNonOptional, this, args[0]);
			}
		});
		function object(shape, params) {
			const def = {
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			};
			return new ZodObject(def);
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = [...inst._zod.values];
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
			return new ZodEnum({
				type: "enum",
				entries,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			_ensureDefaultMemoizer();
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						if (!("input" in _issue)) _issue.input = payload.value;
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					return payload;
				});
				payload.value = output;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : constantCatch(catchValue)
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region lib/types/shared/rpc-contract.js
		/** Shared RPC DTOs and fail codes for `explorerFs`. */
		const EXPLORER_FS_SERVICE = "explorerFs";
		//#endregion
		//#region lib/types/client/rpc.js
		/**
		* Client Typert contribution + typed call helpers for `explorerFs`.
		*/
		const FailCode = _enum([
			"OUT_OF_ROOT",
			"NOT_FOUND",
			"NOT_EMPTY",
			"EXISTS",
			"IS_BINARY",
			"IS_DIR",
			"IO"
		]);
		const FailResultSchema = object({
			ok: literal(false),
			code: FailCode,
			message: string()
		});
		const OkResultSchema = object({ ok: literal(true) });
		const RootOkSchema = object({
			ok: literal(true),
			root: string()
		});
		const FsEntrySchema = object({
			name: string(),
			path: string(),
			kind: _enum(["file", "dir"]),
			size: number().optional()
		});
		const ListOkSchema = object({
			ok: literal(true),
			entries: array(FsEntrySchema)
		});
		const ReadOkSchema = object({
			ok: literal(true),
			content: string()
		});
		const RootResultSchema = union([RootOkSchema, FailResultSchema]);
		const ListResultSchema = union([ListOkSchema, FailResultSchema]);
		const ReadResultSchema = union([ReadOkSchema, FailResultSchema]);
		const MutateResultSchema = union([OkResultSchema, FailResultSchema]);
		const PKG = "@x6_ai/x6-plugin-file-explorer";
		const Str = string();
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
		//#region node_modules/marked/lib/marked.esm.js
		/**
		* marked v18.1.2 - a markdown parser
		* Copyright (c) 2018-2026, MarkedJS. (MIT License)
		* Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
		* https://github.com/markedjs/marked
		*/
		/**
		* DO NOT EDIT THIS FILE
		* The code in this file is generated from files in ./src/
		*/
		function v() {
			return {
				async: !1,
				breaks: !1,
				extensions: null,
				gfm: !0,
				hooks: null,
				pedantic: !1,
				renderer: null,
				silent: !1,
				tokenizer: null,
				walkTokens: null
			};
		}
		var y = v();
		function ee(a) {
			y = a;
		}
		var B = { exec: () => null };
		function I(a) {
			let e = [];
			return (t) => {
				let n = Math.max(0, Math.min(3, t - 1)), s = e[n];
				return s || (s = a(n), e[n] = s), s;
			};
		}
		function c(a, e = "") {
			let t = typeof a == "string" ? a : a.source, n = {
				replace: (s, r) => {
					let o = typeof r == "string" ? r : r.source;
					return o = o.replace(T.caret, "$1"), t = t.replace(s, o), n;
				},
				getRegex: () => new RegExp(t, e)
			};
			return n;
		}
		var Me = ((a = "") => {
			try {
				return !!new RegExp("(?<=1)(?<!1)" + a);
			} catch {
				return !1;
			}
		})();
		var T = {
			codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm,
			outputLinkReplace: /\\([\[\]])/g,
			indentCodeCompensation: /^(\s+)(?:```)/,
			beginningSpace: /^\s+/,
			endingHash: /#$/,
			startingSpaceChar: /^ /,
			endingSpaceChar: / $/,
			endingSpaceTabChar: /[ \t]$/,
			nonSpaceChar: /[^ ]/,
			newLineCharGlobal: /\n/g,
			tabCharGlobal: /\t/g,
			leadingSpaceTab: /^[ \t]+/,
			multipleSpaceGlobal: /\s+/g,
			blankLine: /^[ \t]*$/,
			doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
			blockquoteStart: /^ {0,3}>/,
			blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
			blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
			blockquoteMarkerWhitespace: /^( {0,3}>)([ \t]+)/gm,
			listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
			listIsTask: /^\[[ xX]\] +\S/,
			listReplaceTask: /^\[[ xX]\] +/,
			listTaskCheckbox: /\[[ xX]\]/,
			anyLine: /\n.*\n/,
			hrefBrackets: /^<(.*)>$/,
			tableDelimiter: /[:|]/,
			tableAlignChars: /^\||\| *$/g,
			tableRowBlankLine: /\n[ \t]*$/,
			tableAlignRight: /^ *-+: *$/,
			tableAlignCenter: /^ *:-+: *$/,
			tableAlignLeft: /^ *:-+ *$/,
			startATag: /^<a /i,
			endATag: /^<\/a>/i,
			startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
			endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
			startAngleBracket: /^</,
			endAngleBracket: />$/,
			pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
			unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
			numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,
			numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
			escapeTest: /[&<>"']/,
			escapeReplace: /[&<>"']/g,
			escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
			escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
			caret: /(^|[^\[])\^/g,
			percentDecode: /%25/g,
			findPipe: /\|/g,
			splitPipe: / \|/,
			slashPipe: /\\\|/g,
			carriageReturn: /\r\n|\r/g,
			spaceLine: /^ +$/gm,
			notSpaceStart: /^\S*/,
			endingNewline: /\n$/,
			listItemRegex: (a) => new RegExp(`^( {0,3}${a})((?:[	 ][^\\n]*)?(?:\\n|$))`),
			nextBulletRegex: I((a) => new RegExp(`^ {0,${a}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
			hrRegex: I((a) => new RegExp(`^ {0,${a}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),
			fencesBeginRegex: I((a) => new RegExp(`^ {0,${a}}(?:\`\`\`|~~~)`)),
			headingBeginRegex: I((a) => new RegExp(`^ {0,${a}}#{1,6}(?:\\s|$)`)),
			pedanticHeadingBeginRegex: I((a) => new RegExp(`^ {0,${a}}#`)),
			htmlBeginRegex: I((a) => new RegExp(`^ {0,${a}}(?:</?(?:${K})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")),
			blockquoteBeginRegex: I((a) => new RegExp(`^ {0,${a}}>`))
		};
		var Ce = /^(?:[ \t]*(?:\n|$))+/;
		var Ee = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
		var Ie = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
		var U = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
		var Be = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
		var ne = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
		var me = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
		var xe = c(me).replace(/bull/g, ne).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
		var De = c(me).replace(/bull/g, ne).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
		var re = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/;
		var qe = /^[^\n]+/;
		var se = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
		var Ze = c(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", se).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
		var ve = c(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, ne).getRegex();
		var K = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
		var ie = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
		var He = c("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ie).replace("tag", K).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
		var be = (a) => c(re).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", a).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K).getRegex();
		var Ge = be(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/);
		var Ne = be(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/);
		var oe = {
			blockquote: c(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph", Ne).getRegex(),
			code: Ee,
			def: Ze,
			fences: Ie,
			heading: Be,
			hr: U,
			html: He,
			lheading: xe,
			list: ve,
			newline: Ce,
			paragraph: Ge,
			table: B,
			text: qe
		};
		var ke = c("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K).getRegex();
		var je = {
			...oe,
			lheading: De,
			table: ke,
			paragraph: c(re).replace("hr", U).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ke).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", K).getRegex()
		};
		var Fe = {
			...oe,
			html: c(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ie).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
			def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
			heading: /^(#{1,6})(.*)(?:\n+|$)/,
			fences: B,
			lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
			paragraph: c(re).replace("hr", U).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", xe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
		};
		var Ue = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
		var Ke = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
		var Re = /^( {2,}|\\)\n(?!\s*$)[ \t]*/;
		var We = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
		var $ = /[\p{P}\p{S}]/u;
		var H = /[\s\p{P}\p{S}]/u;
		var W = /[^\s\p{P}\p{S}]/u;
		var Xe = c(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex();
		var Ve = /[\p{Pi}\p{Ps}"']/u;
		var Te = /(?!~)[\p{P}\p{S}]/u;
		var Je = /(?!~)[\s\p{P}\p{S}]/u;
		var Ye = /(?:[^\s\p{P}\p{S}]|~)/u;
		var et = c(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Me ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
		var Oe = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
		var tt = c(Oe, "u").replace(/punct/g, $).getRegex();
		var nt = c(Oe, "u").replace(/punct/g, Te).getRegex();
		var st = c(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ve).replace(/punct/g, $).getRegex();
		var we = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
		var it = c(we, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, $).getRegex();
		var ot = c(we, "gu").replace(/notPunctSpace/g, Ye).replace(/punctSpace/g, Je).replace(/punct/g, Te).getRegex();
		var lt = c("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, $).getRegex();
		var ut = c("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, $).getRegex();
		var ct = c("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, $).getRegex();
		var ht = c(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, $).getRegex();
		var kt = c("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, $).getRegex();
		var gt = c(/\\(punct)/, "gu").replace(/punct/g, $).getRegex();
		var ft = c(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, $).getRegex();
		var mt = c(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
		var xt = c(ie).replace("(?:-->|$)", "-->").getRegex();
		var bt = c("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", xt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
		var Pe = /\[(?:\\[\s\S]|[^\[\]\\])*\]/;
		var Y = c(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Pe).getRegex();
		var Rt = c(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", Y).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
		var Tt = c(/^!?\[(label)\]\[(ref)\]/).replace("label", Y).replace("ref", se).getRegex();
		var Ot = c(/^!?\[(ref)\](?:\[\])?/).replace("ref", se).getRegex();
		var ge = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/;
		var wt = c(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Pe).getRegex();
		var Pt = c("reflink|nolink(?!\\()", "g").replace("reflink", c(/^!?\[(label)\]\[(ref)\]/).replace("label", wt).replace("ref", ge).getRegex()).replace("nolink", c(/^!?\[(ref)\](?:\[\])?/).replace("ref", ge).getRegex()).getRegex();
		var fe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
		var St = c(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex();
		var ae = {
			_backpedal: B,
			anyPunctuation: gt,
			anyPunctuationOutsideCode: ft,
			autolink: mt,
			blockSkip: et,
			br: Re,
			code: Ke,
			del: B,
			delLDelim: B,
			delRDelim: B,
			emStrongLDelim: tt,
			emStrongRDelimAst: it,
			emStrongRDelimUnd: ut,
			escape: Ue,
			link: Rt,
			nolink: Ot,
			punctuation: Xe,
			reflink: Tt,
			reflinkSearch: Pt,
			tag: bt,
			text: We,
			url: B
		};
		var _t = {
			...ae,
			emStrongLDelim: st,
			emStrongRDelimAst: lt,
			emStrongRDelimUnd: ct,
			link: c(/^!?\[(label)\]\((.*?)\)/).replace("label", Y).getRegex(),
			reflink: c(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Y).getRegex()
		};
		var te = {
			...ae,
			emStrongRDelimAst: ot,
			emStrongLDelim: nt,
			delLDelim: ht,
			delRDelim: kt,
			url: c(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", St).replace("protocol", fe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),
			_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
			del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
			text: c(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", fe).replace(/emailProtocol/g, /(?:mailto|xmpp):/).getRegex()
		};
		var $t = {
			...te,
			br: c(Re).replace("{2,}", "*").getRegex(),
			text: c(te.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
		};
		var X = {
			normal: oe,
			gfm: je,
			pedantic: Fe
		};
		var G = {
			normal: ae,
			gfm: te,
			breaks: $t,
			pedantic: _t
		};
		var Lt = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		};
		var ye = (a) => Lt[a];
		function P(a, e) {
			if (e) {
				if (T.escapeTest.test(a)) return a.replace(T.escapeReplace, ye);
			} else if (T.escapeTestNoEncode.test(a)) return a.replace(T.escapeReplaceNoEncode, ye);
			return a;
		}
		function Se(a) {
			return T.numericCharacterReference.test(a) ? a.replace(T.numericCharacterReferenceOrAmpersand, (e, t, n) => {
				if (t === void 0 && n === void 0) return "&amp;";
				let s = t === void 0 ? Number.parseInt(n, 16) : Number.parseInt(t, 10);
				return s === 0 || s > 1114111 || s >= 55296 && s <= 57343 ? "�" : s === 38 ? "&amp;" : String.fromCodePoint(s);
			}) : a;
		}
		function le(a) {
			try {
				a = encodeURI(a).replace(T.percentDecode, "%");
			} catch {
				return null;
			}
			return a;
		}
		function ue(a, e) {
			let n = a.replace(T.findPipe, (r, o, i) => {
				let l = !1, u = o;
				for (; --u >= 0 && i[u] === "\\";) l = !l;
				return l ? "|" : " |";
			}).split(T.splitPipe), s = 0;
			if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
			else for (; n.length < e;) n.push("");
			for (; s < n.length; s++) n[s] = n[s].trim().replace(T.slashPipe, "|");
			return n;
		}
		function z(a, e, t) {
			let n = a.length;
			if (n === 0) return "";
			let s = 0;
			for (; s < n;) {
				let r = a.charAt(n - s - 1);
				if (r === e && !t) s++;
				else if (r !== e && t) s++;
				else break;
			}
			return a.slice(0, n - s);
		}
		function pe(a) {
			let e = a.split(`
`), t = e.length - 1;
			for (; t >= 0 && T.blankLine.test(e[t]);) t--;
			return e.length - t <= 2 ? a : e.slice(0, t + 1).join(`
`);
		}
		function N(a) {
			return a.trim().toLowerCase().toUpperCase().toLowerCase();
		}
		function ce(a, e) {
			if (a.indexOf(e[0]) === -1 && a.indexOf(e[1]) === -1) return -1;
			let t = 0;
			for (let n = 0; n < a.length; n++) if (a[n] === "\\") n++;
			else if (a[n] === e[0]) t++;
			else if (a[n] === e[1] && (t--, t < 0)) return n;
			return t > 0 ? -2 : -1;
		}
		function V(a, e = 0) {
			let t = e, n = "";
			for (let s of a) if (s === "	") {
				let r = 4 - t % 4;
				n += " ".repeat(r), t += r;
			} else n += s, t++;
			return n;
		}
		function _e(a, e, t, n, s) {
			let r = e.href, o = e.title || null, i = a[1].replace(s.other.outputLinkReplace, "$1"), l = a[0].charAt(0) === "!", u = n.state.inLink, h = n.state.linkEmitted, p = n.state.inRawBlock;
			n.state.inLink = !0, n.state.linkEmitted = !1;
			let d = n.inlineTokens(i), g = n.state.linkEmitted;
			if (n.state.linkEmitted = h, n.state.inLink = u, !l) {
				if (g) {
					n.state.inRawBlock = p;
					return;
				}
				n.state.linkEmitted = !0;
			}
			return {
				type: l ? "image" : "link",
				raw: t,
				href: r,
				title: o,
				text: i,
				tokens: d
			};
		}
		function At(a, e, t) {
			let n = a.match(t.other.indentCodeCompensation);
			if (n === null) return e;
			let s = n[1];
			return e.split(`
`).map((r) => {
				let o = r.match(t.other.beginningSpace);
				if (o === null) return r;
				let [i] = o;
				return r.slice(Math.min(i.length, s.length));
			}).join(`
`);
		}
		function $e(a, e, t, n) {
			if (!e.includes("<")) return !1;
			for (let s = 0; s < e.length; s++) {
				if (e[s] === "\\") {
					s++;
					continue;
				}
				if (e[s] === "`") {
					let i = n.inline.code.exec(e.slice(s));
					if (i) {
						s += i[0].length - 1;
						continue;
					}
				}
				if (e[s] !== "<") continue;
				let r = a.slice(t + s), o = n.inline.tag.exec(r) || n.inline.autolink.exec(r);
				if (o) {
					if (o[0].length > e.length - s) return !0;
					s += o[0].length - 1;
				}
			}
			return !1;
		}
		var _ = class {
			options;
			rules;
			lexer;
			constructor(e) {
				this.options = e || y;
			}
			space(e) {
				let t = this.rules.block.newline.exec(e);
				if (t && t[0].length > 0) return {
					type: "space",
					raw: t[0]
				};
			}
			code(e) {
				let t = this.rules.block.code.exec(e);
				if (t) {
					let n = this.options.pedantic ? t[0] : pe(t[0]);
					return {
						type: "code",
						raw: n,
						codeBlockStyle: "indented",
						text: n.replace(this.rules.other.codeRemoveIndent, "")
					};
				}
			}
			fences(e) {
				let t = this.rules.block.fences.exec(e);
				if (t) {
					let n = t[0], s = At(n, t[3] || "", this.rules);
					return {
						type: "code",
						raw: n,
						lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
						text: s
					};
				}
			}
			heading(e) {
				let t = this.rules.block.heading.exec(e);
				if (t) {
					let n = t[2].trim();
					if (this.rules.other.endingHash.test(n)) {
						let s = z(n, "#");
						(this.options.pedantic || !s || this.rules.other.endingSpaceTabChar.test(s)) && (n = s.trim());
					}
					return {
						type: "heading",
						raw: z(t[0], `
`),
						depth: t[1].length,
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			hr(e) {
				let t = this.rules.block.hr.exec(e);
				if (t) return {
					type: "hr",
					raw: z(t[0], `
`)
				};
			}
			blockquote(e) {
				let t = this.rules.block.blockquote.exec(e);
				if (t) {
					let n = z(t[0], `
`).split(`
`), s = "", r = "", o = [];
					for (; n.length > 0;) {
						let i = !1, l = [], u;
						for (u = 0; u < n.length; u++) if (this.rules.other.blockquoteStart.test(n[u])) l.push(n[u]), i = !0;
						else if (!i) l.push(n[u]);
						else break;
						n = n.slice(u);
						let h = l.join(`
`), p = h.replace(this.rules.other.blockquoteMarkerWhitespace, (k, b, x) => b + V(x, b.length)).replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
						s = s ? `${s}
${h}` : h, r = r ? `${r}
${p}` : p;
						let d = this.lexer.state.top;
						if (this.lexer.state.top = !0, this.lexer.blockTokens(p, o, !0), this.lexer.state.top = d, n.length === 0) break;
						let g = o.at(-1);
						if (g?.type === "code" || g?.type === "heading" || g?.type === "hr" || g?.type === "html") break;
						if (g?.type === "blockquote") {
							let k = g, b = n.join(`
`), x = k.raw + `
` + b.replace(this.rules.other.blockquoteSetextReplace2, ""), f = this.blockquote(x);
							o[o.length - 1] = f;
							let S = x.substring(f.raw.length).replace(/^\n/, ""), R = S ? S.split(`
`).length : 0, C = R ? n.slice(0, -R) : n;
							C.length > 0 && (s = `${s}
${C.join(`
`)}`), r = r.substring(0, r.length - k.text.length) + f.text;
							break;
						} else if (g?.type === "list") {
							let k = g, b = k.raw + `
` + n.join(`
`), x = this.list(b);
							o[o.length - 1] = x;
							let f = x.raw.length > k.raw.length ? b.slice(k.raw.length + 1, x.raw.length).split(`
`).length : 0;
							if (f > 0) {
								let S = n.slice(0, f).join(`
`);
								s = `${s}
${S}`, r = `${r}
${S}`;
							}
							n = n.slice(f);
							continue;
						}
					}
					return {
						type: "blockquote",
						raw: s,
						tokens: o,
						text: r
					};
				}
			}
			list(e) {
				let t = this.rules.block.list.exec(e);
				if (t) {
					let n = e, s = () => n.length - e.length, r = t[1].trim(), o = r.length > 1, i = {
						type: "list",
						raw: "",
						ordered: o,
						start: o ? +r.slice(0, -1) : "",
						loose: !1,
						items: []
					};
					r = o ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = o ? r : "[*+-]");
					let l = this.rules.other.listItemRegex(r), u = !1;
					for (; e;) {
						let p = !1, d = "";
						if (!(t = l.exec(e)) || this.rules.block.hr.test(e)) break;
						let g = s();
						e = e.substring(t[0].length);
						let k = t[2].split(`
`, 1)[0], b = t[1].length, x = this.options.pedantic ? V(k, b) : k.replace(this.rules.other.leadingSpaceTab, (Q) => V(Q, b)), f = e.split(`
`, 1)[0], S = !x.trim(), R = 0;
						if (this.options.pedantic ? (R = 2, d = x.trimStart()) : S ? R = b + 1 : (R = x.search(this.rules.other.nonSpaceChar), R = R > 4 ? 1 : R, d = x.slice(R), R += b), S && this.rules.other.blankLine.test(f) && (e = e.substring(f.length + 1), p = !0), !p) {
							let Q = this.rules.other.nextBulletRegex(R), E = this.rules.other.hrRegex(R), j = this.rules.other.fencesBeginRegex(R), F = this.options.pedantic ? this.rules.other.pedanticHeadingBeginRegex(R) : this.rules.other.headingBeginRegex(R), Le = this.rules.other.htmlBeginRegex(R), Ae = this.rules.other.blockquoteBeginRegex(R);
							for (; e;) {
								let he = e.split(`
`, 1)[0], Z;
								if (f = he, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), Z = f) : Z = f.replace(this.rules.other.leadingSpaceTab, (de) => V(de)), j.test(f) || F.test(f) || Le.test(f) || Ae.test(f) || Q.test(f) || E.test(f)) break;
								if (Z.search(this.rules.other.nonSpaceChar) >= R || !f.trim()) d += `
` + Z.slice(R);
								else {
									if (S || x.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || j.test(x) || F.test(x) || E.test(x)) break;
									let ze = !this.options.pedantic && /^ {0,3}(?:=+|-+) *$/.test(f) && this.rules.block.lheading.test(`${x}
${f}`) ? `    ${Z.replace(/^ {0,3}/, "")}` : f;
									d += `
` + ze;
								}
								S = !f.trim(), e = e.substring(he.length + 1), x = Z.slice(R);
							}
						}
						let C = n.slice(g, s());
						i.loose || (u ? i.loose = !0 : this.rules.other.doubleBlankLine.test(C) && (u = !0)), i.items.push({
							type: "list_item",
							raw: C,
							task: !!this.options.gfm && this.rules.other.listIsTask.test(d),
							loose: !1,
							text: d,
							tokens: []
						});
					}
					let h = i.items.at(-1);
					if (h) h.raw = h.raw.trimEnd(), h.text = h.text.trimEnd();
					else return;
					i.raw = n.slice(0, s()).trimEnd();
					for (let p of i.items) if (this.lexer.state.top = !1, p.tokens = this.lexer.blockTokens(p.text, []), !i.loose) {
						let d = p.tokens.filter((k) => k.type === "space");
						i.loose = d.length > 0 && d.some((k) => this.rules.other.anyLine.test(k.raw));
					}
					for (let p of i.items) {
						let d = p.tokens[0];
						if (p.task && (d?.type === "text" || d?.type === "paragraph")) {
							p.text = p.text.replace(this.rules.other.listReplaceTask, ""), d.raw = d.raw.replace(this.rules.other.listReplaceTask, ""), d.text = d.text.replace(this.rules.other.listReplaceTask, "");
							for (let k = this.lexer.inlineQueue.length - 1; k >= 0; k--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[k].src)) {
								this.lexer.inlineQueue[k].src = this.lexer.inlineQueue[k].src.replace(this.rules.other.listReplaceTask, "");
								break;
							}
							let g = this.rules.other.listTaskCheckbox.exec(p.raw);
							if (g) {
								let k = {
									type: "checkbox",
									raw: g[0] + " ",
									checked: g[0] !== "[ ]"
								};
								p.checked = k.checked, i.loose ? p.tokens[0] && ["paragraph", "text"].includes(p.tokens[0].type) && "tokens" in p.tokens[0] && p.tokens[0].tokens ? (p.tokens[0].raw = k.raw + p.tokens[0].raw, p.tokens[0].text = k.raw + p.tokens[0].text, p.tokens[0].tokens.unshift(k)) : p.tokens.unshift({
									type: "paragraph",
									raw: k.raw,
									text: k.raw,
									tokens: [k]
								}) : p.tokens.unshift(k);
							}
						} else p.task && (p.task = !1);
					}
					if (i.loose) for (let p of i.items) {
						p.loose = !0;
						for (let d of p.tokens) d.type === "text" && (d.type = "paragraph");
					}
					return i;
				}
			}
			html(e) {
				let t = this.rules.block.html.exec(e);
				if (t) {
					let n = pe(t[0]);
					return {
						type: "html",
						block: !0,
						raw: n,
						pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
						text: n
					};
				}
			}
			def(e) {
				let t = this.rules.block.def.exec(e);
				if (t) {
					if (!this.rules.other.startAngleBracket.test(t[2]) && ce(t[2], "()") !== -1) return;
					let n = N(t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
					return {
						type: "def",
						tag: n,
						raw: z(t[0], `
`),
						href: s,
						title: r
					};
				}
			}
			table(e) {
				let t = this.rules.block.table.exec(e);
				if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
				let n = ue(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), r = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], o = {
					type: "table",
					raw: z(t[0], `
`),
					header: [],
					align: [],
					rows: []
				};
				if (n.length === s.length) {
					for (let i of s) this.rules.other.tableAlignRight.test(i) ? o.align.push("right") : this.rules.other.tableAlignCenter.test(i) ? o.align.push("center") : this.rules.other.tableAlignLeft.test(i) ? o.align.push("left") : o.align.push(null);
					for (let i = 0; i < n.length; i++) o.header.push({
						text: n[i],
						tokens: this.lexer.inline(n[i]),
						header: !0,
						align: o.align[i]
					});
					for (let i of r) o.rows.push(ue(i, o.header.length).map((l, u) => ({
						text: l,
						tokens: this.lexer.inline(l),
						header: !1,
						align: o.align[u]
					})));
					return o;
				}
			}
			lheading(e) {
				let t = this.rules.block.lheading.exec(e);
				if (t) {
					let n = t[1].trim();
					return {
						type: "heading",
						raw: z(t[0], `
`),
						depth: t[2].charAt(0) === "=" ? 1 : 2,
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			paragraph(e) {
				let t = this.rules.block.paragraph.exec(e);
				if (t) {
					let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
					return {
						type: "paragraph",
						raw: t[0],
						text: n,
						tokens: this.lexer.inline(n)
					};
				}
			}
			text(e) {
				let t = this.rules.block.text.exec(e);
				if (t) return {
					type: "text",
					raw: t[0],
					text: t[0],
					tokens: this.lexer.inline(t[0])
				};
			}
			escape(e) {
				let t = this.rules.inline.escape.exec(e);
				if (t) return {
					type: "escape",
					raw: t[0],
					text: t[1]
				};
			}
			tag(e) {
				let t = this.rules.inline.tag.exec(e);
				if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
					type: "html",
					raw: t[0],
					inLink: this.lexer.state.inLink,
					inRawBlock: this.lexer.state.inRawBlock,
					block: !1,
					text: t[0]
				};
			}
			link(e) {
				if (this.lexer.state.linkParenPossible === !1) return;
				let t = this.rules.inline.link.exec(e);
				if (t) {
					let n = t[0].charAt(0) === "!" ? 2 : 1;
					if (!this.options.pedantic && $e(e, t[1], n, this.rules)) return;
					let s = t[2].trim();
					if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
						if (!this.rules.other.endAngleBracket.test(s)) return;
						let i = z(s.slice(0, -1), "\\");
						if ((s.length - i.length) % 2 === 0) return;
					} else {
						let i = ce(t[2], "()");
						if (i === -2) return;
						if (i > -1) {
							let u = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
							t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, u).trim(), t[3] = "";
						}
					}
					let r = t[2], o = "";
					if (this.options.pedantic) {
						let i = this.rules.other.pedanticHrefTitle.exec(r);
						i && (r = i[1], o = i[3]);
					} else o = t[3] ? t[3].slice(1, -1) : "";
					return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? r = r.slice(1) : r = r.slice(1, -1)), _e(t, {
						href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
						title: o && o.replace(this.rules.inline.anyPunctuation, "$1")
					}, t[0], this.lexer, this.rules);
				}
			}
			reflink(e, t) {
				let n;
				if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
					let s = n[0].charAt(0) === "!" ? 2 : 1;
					if (!this.options.pedantic && $e(e, n[1], s, this.rules)) return;
					let o = t[N((n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "))];
					if (!o) {
						let i = n[0].charAt(0);
						return {
							type: "text",
							raw: i,
							text: i
						};
					}
					return _e(n, o, n[0], this.lexer, this.rules);
				}
			}
			emStrong(e, t, n = "") {
				let s = this.rules.inline.emStrongLDelim.exec(e);
				if (!s || !s[1] && !s[2] && !s[3] && !s[4]) return;
				let r = s[0][0], o = n === r, i = t.length - e.length, l = i;
				for (; !this.options.pedantic && l > 0 && t[l - 1] === r;) l--;
				let u = [...t.slice(Math.max(0, l - 2), l)].at(-1) ?? "", h = u === "*" || u === "_" || !!this.rules.inline.punctuation.exec(u);
				l < i && (n = u);
				let p = l < i ? h : !!this.rules.inline.punctuation.exec(n);
				if (s[4] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
				let d = s[1] || s[3] || "";
				if (!d || !n || p) {
					let g = [...s[0]].length - 1, k, b, x = g, f = 0, S = i - l + g, R = !this.options.pedantic && !!u.trim() && (!!d || r === "*" && !h), C = r === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
					for (C.lastIndex = 0, t = t.slice(-1 * e.length + g); (s = C.exec(t)) !== null;) {
						if (k = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !k) continue;
						if (b = [...k].length, s[3] || s[4]) {
							x += b;
							continue;
						} else if (s[5] || s[6] || R) {
							if (o && (s[5] || s[6])) break;
							if (S % 3 && !((S + b) % 3)) {
								f += b;
								continue;
							}
						}
						if (x -= b, x > 0) continue;
						b = Math.min(b, b + x + f);
						let Q = [...s[0]][0].length, E = e.slice(0, g + s.index + Q + b);
						if (Math.min(g, b) % 2) {
							let F = E.slice(1, -1);
							return {
								type: "em",
								raw: E,
								text: F,
								tokens: this.lexer.inlineTokens(F)
							};
						}
						let j = E.slice(2, -2);
						return {
							type: "strong",
							raw: E,
							text: j,
							tokens: this.lexer.inlineTokens(j)
						};
					}
				}
			}
			codespan(e) {
				let t = this.rules.inline.code.exec(e);
				if (t) {
					let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), r = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
					return s && r && (n = n.substring(1, n.length - 1)), {
						type: "codespan",
						raw: t[0],
						text: n
					};
				}
			}
			br(e) {
				let t = this.rules.inline.br.exec(e);
				if (t) return {
					type: "br",
					raw: t[0]
				};
			}
			del(e, t, n = "") {
				let s = this.rules.inline.delLDelim.exec(e);
				if (!s) return;
				if (!(s[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
					let o = [...s[0]].length - 1, i, l, u = o, h = this.rules.inline.delRDelim;
					for (h.lastIndex = 0, t = t.slice(-1 * e.length + o); (s = h.exec(t)) !== null;) {
						if (i = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !i || (l = [...i].length, l !== o)) continue;
						if (s[3] || s[4]) {
							u += l;
							continue;
						}
						if (u -= l, u > 0) continue;
						l = Math.min(l, l + u);
						let p = [...s[0]][0].length, d = e.slice(0, o + s.index + p + l), g = d.slice(o, -o);
						return {
							type: "del",
							raw: d,
							text: g,
							tokens: this.lexer.inlineTokens(g)
						};
					}
				}
			}
			autolink(e) {
				let t = this.rules.inline.autolink.exec(e);
				if (t) {
					let n, s;
					return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), {
						type: "link",
						raw: t[0],
						text: n,
						href: s,
						autolink: !0,
						tokens: [{
							type: "text",
							raw: n,
							text: n
						}]
					};
				}
			}
			url(e) {
				let t;
				if (t = this.rules.inline.url.exec(e)) {
					let n, s;
					if (t[2] === "@") n = t[0], s = "mailto:" + n;
					else {
						let r;
						do
							r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
						while (r !== t[0]);
						n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
					}
					return {
						type: "link",
						raw: t[0],
						text: n,
						href: s,
						autolink: !0,
						tokens: [{
							type: "text",
							raw: n,
							text: n
						}]
					};
				}
			}
			inlineText(e) {
				let t = this.rules.inline.text.exec(e);
				if (t) {
					let n = this.lexer.state.inRawBlock;
					return {
						type: "text",
						raw: t[0],
						text: n ? t[0] : Se(t[0]),
						escaped: n
					};
				}
			}
		};
		var O = class a {
			tokens;
			options;
			state;
			inlineQueue;
			tokenizer;
			constructor(e) {
				this.tokens = [], this.tokens.links = Object.create(null), this.options = e || y, this.options.tokenizer = this.options.tokenizer || new _(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
					inLink: !1,
					inRawBlock: !1,
					linkEmitted: !1,
					linkParenPossible: !0,
					top: !0
				};
				let t = {
					other: T,
					block: X.normal,
					inline: G.normal
				};
				this.options.pedantic ? (t.block = X.pedantic, t.inline = G.pedantic) : this.options.gfm && (t.block = X.gfm, this.options.breaks ? t.inline = G.breaks : t.inline = G.gfm), this.tokenizer.rules = t;
			}
			static get rules() {
				return {
					block: X,
					inline: G
				};
			}
			static lex(e, t) {
				return new a(t).lex(e);
			}
			static lexInline(e, t) {
				return new a(t).inlineTokens(e);
			}
			lex(e) {
				e = e.replace(T.carriageReturn, `
`), this.blockTokens(e, this.tokens);
				for (let t = 0; t < this.inlineQueue.length; t++) {
					let n = this.inlineQueue[t];
					this.state.inRawBlock = !1, this.inlineTokens(n.src, n.tokens);
				}
				return this.inlineQueue = [], this.tokens;
			}
			blockTokens(e, t = [], n = !1) {
				this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(T.tabCharGlobal, "    ").replace(T.spaceLine, ""));
				let s = Infinity;
				for (; e;) {
					if (e.length < s) s = e.length;
					else {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
					let r;
					if (this.options.extensions?.block?.some((i) => (r = i.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), !0) : !1)) continue;
					if (r = this.tokenizer.space(e)) {
						e = e.substring(r.raw.length);
						let i = t.at(-1);
						r.raw.length === 1 && i !== void 0 ? i.raw += `
` : t.push(r);
						continue;
					}
					if (r = this.tokenizer.code(e)) {
						e = e.substring(r.raw.length);
						let i = t.at(-1);
						i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.at(-1).src = i.text) : t.push(r);
						continue;
					}
					if (r = this.tokenizer.fences(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.heading(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.hr(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.blockquote(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.list(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.html(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.def(e)) {
						e = e.substring(r.raw.length);
						let i = t.at(-1);
						i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.raw, this.inlineQueue.at(-1).src = i.text) : (this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
							href: r.href,
							title: r.title
						}), t.push(r));
						continue;
					}
					if (r = this.tokenizer.table(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					if (r = this.tokenizer.lheading(e)) {
						e = e.substring(r.raw.length), t.push(r);
						continue;
					}
					let o = e;
					if (this.options.extensions?.startBlock) {
						let i = Infinity, l = e.slice(1), u;
						this.options.extensions.startBlock.forEach((h) => {
							u = h.call({ lexer: this }, l), typeof u == "number" && u >= 0 && (i = Math.min(i, u));
						}), i < Infinity && i >= 0 && (o = e.substring(0, i + 1));
					}
					if (this.state.top && (r = this.tokenizer.paragraph(o))) {
						let i = t.at(-1);
						n && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(r), n = o.length !== e.length, e = e.substring(r.raw.length);
						continue;
					}
					if (r = this.tokenizer.text(e)) {
						e = e.substring(r.raw.length);
						let i = t.at(-1);
						i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + r.raw, i.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(r);
						continue;
					}
					if (e) {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
				}
				return this.state.top = !0, t;
			}
			inline(e, t = []) {
				return this.inlineQueue.push({
					src: e,
					tokens: t
				}), t;
			}
			linkInText(e) {
				if (!e.includes("[")) return !1;
				let t = this.tokenizer.rules.inline.link;
				for (let n of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(n[0]) && e.charAt(n.index - 1) !== "!") return !0;
				for (let n of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
					let s = n[0], r = s.lastIndexOf("[");
					if (!(s.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, N(s.slice(r + 1, -1)))) && !(r > 1 && this.linkInText(s.slice(1, r - 1)))) return !0;
				}
				return !1;
			}
			inlineTokens(e, t = []) {
				this.tokenizer.lexer = this;
				let n = this.state.linkParenPossible;
				this.state.linkParenPossible = n && e.includes(")");
				try {
					return this.#e(e, t);
				} finally {
					this.state.linkParenPossible = n;
				}
			}
			#e(e, t) {
				let n = e.includes("*") || e.includes("_") || e.includes("~") || this.options.hooks?.emStrongMask || this.tokenizer.emStrong !== _.prototype.emStrong || this.tokenizer.del !== _.prototype.del ? this.#t(e) : e, s = !1, r = "", o = Infinity;
				for (; e;) {
					if (e.length < o) o = e.length;
					else {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
					s || (r = ""), s = !1;
					let i;
					if (this.options.extensions?.inline?.some((u) => (i = u.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
					if (i = this.tokenizer.escape(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.tag(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.link(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.reflink(e, this.tokens.links)) {
						e = e.substring(i.raw.length);
						let u = t.at(-1);
						i.type === "text" && u?.type === "text" ? (u.raw += i.raw, u.text += i.text) : t.push(i);
						continue;
					}
					if (i = this.tokenizer.emStrong(e, n, r)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.codespan(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.br(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.del(e, n, r)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (i = this.tokenizer.autolink(e)) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					if (!this.state.inLink && (i = this.tokenizer.url(e))) {
						e = e.substring(i.raw.length), t.push(i);
						continue;
					}
					let l = e;
					if (this.options.extensions?.startInline) {
						let u = Infinity, h = e.slice(1), p;
						this.options.extensions.startInline.forEach((d) => {
							p = d.call({ lexer: this }, h), typeof p == "number" && p >= 0 && (u = Math.min(u, p));
						}), u < Infinity && u >= 0 && (l = e.substring(0, u + 1));
					}
					if (i = this.tokenizer.inlineText(l)) {
						e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (r = i.raw.slice(-1)), s = !0;
						let u = t.at(-1);
						u?.type === "text" ? (u.raw += i.raw, u.text += i.text) : t.push(i);
						continue;
					}
					if (e) {
						this.infiniteLoopError(e.charCodeAt(0));
						break;
					}
				}
				return t;
			}
			#t(e) {
				let t = e;
				if (this.tokens.links && e.includes("[")) {
					let n = this.tokenizer.rules.inline.reflinkSearch, s = (r) => {
						let o = r.lastIndexOf("[");
						if (!Object.hasOwn(this.tokens.links, N(r.slice(o + 1, -1)))) return r;
						if (o > 1 && r.charAt(0) !== "!") {
							let i = r.slice(1, o - 1);
							if (this.linkInText(i)) return "[" + i.replace(n, s) + "][" + "a".repeat(r.length - o - 2) + "]";
						}
						return "[" + "a".repeat(r.length - 2) + "]";
					};
					t = t.replace(n, s);
				}
				return t = t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (n, s, r) => r ? "+".repeat(n.length) : s ? s + n.slice(s.length, -s.length).replace(/`/g, "+") + s : n), t = t.replace(this.tokenizer.rules.inline.blockSkip, (n, s, r) => {
					let o = r ? r.length : 0;
					return n.slice(0, o) + "[" + "a".repeat(n.length - o - 2) + "]";
				}), t = this.options.hooks?.emStrongMask?.call({ lexer: this }, t) ?? t, t;
			}
			infiniteLoopError(e) {
				let t = "Infinite loop on byte: " + e;
				if (this.options.silent) console.error(t);
				else throw new Error(t);
			}
		};
		var L = class {
			options;
			parser;
			constructor(e) {
				this.options = e || y;
			}
			space(e) {
				return "";
			}
			code({ text: e, lang: t, escaped: n }) {
				let s = (t || "").match(T.notSpaceStart)?.[0], r = e ? e.replace(T.endingNewline, "") + `
` : "";
				return s ? "<pre><code class=\"language-" + P(s) + "\">" + (n ? r : P(r, !0)) + `</code></pre>
` : "<pre><code>" + (n ? r : P(r, !0)) + `</code></pre>
`;
			}
			blockquote({ tokens: e }) {
				return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
			}
			html({ text: e }) {
				return e;
			}
			def(e) {
				return "";
			}
			heading({ tokens: e, depth: t }) {
				return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
			}
			hr(e) {
				return `<hr>
`;
			}
			list(e) {
				let t = e.ordered, n = e.start, s = "";
				for (let i = 0; i < e.items.length; i++) {
					let l = e.items[i];
					s += this.listitem(l);
				}
				let r = t ? "ol" : "ul", o = t && n !== 1 ? " start=\"" + n + "\"" : "";
				return "<" + r + o + `>
` + s + "</" + r + `>
`;
			}
			listitem(e) {
				return `<li>${this.parser.parse(e.tokens)}</li>
`;
			}
			checkbox({ checked: e }) {
				return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
			}
			paragraph({ tokens: e }) {
				return `<p>${this.parser.parseInline(e)}</p>
`;
			}
			table(e) {
				let t = "", n = "";
				for (let r = 0; r < e.header.length; r++) n += this.tablecell(e.header[r]);
				t += this.tablerow({ text: n });
				let s = "";
				for (let r = 0; r < e.rows.length; r++) {
					let o = e.rows[r];
					n = "";
					for (let i = 0; i < o.length; i++) n += this.tablecell(o[i]);
					s += this.tablerow({ text: n });
				}
				return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
			}
			tablerow({ text: e }) {
				return `<tr>
${e}</tr>
`;
			}
			tablecell(e) {
				let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
				return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
			}
			strong({ tokens: e }) {
				return `<strong>${this.parser.parseInline(e)}</strong>`;
			}
			em({ tokens: e }) {
				return `<em>${this.parser.parseInline(e)}</em>`;
			}
			codespan({ text: e }) {
				return `<code>${P(e, !0)}</code>`;
			}
			br(e) {
				return "<br>";
			}
			del({ tokens: e }) {
				return `<del>${this.parser.parseInline(e)}</del>`;
			}
			link({ href: e, title: t, text: n, tokens: s, autolink: r }) {
				let o = r ? P(n, !0) : this.parser.parseInline(s), i = le(e);
				if (i === null) return o;
				e = P(i, r);
				let l = "<a href=\"" + e + "\"";
				return t && (l += " title=\"" + P(t) + "\""), l += ">" + o + "</a>", l;
			}
			image({ href: e, title: t, text: n, tokens: s }) {
				s && (n = this.parser.parseInline(s, this.parser.textRenderer));
				let r = le(e);
				if (r === null) return P(n);
				e = r;
				let o = `<img src="${P(e)}" alt="${P(n)}"`;
				return t && (o += ` title="${P(t)}"`), o += ">", o;
			}
			text(e) {
				return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : P(e.text);
			}
		};
		var M = class {
			parser;
			strong({ text: e, tokens: t }) {
				return t ? this.parser.parseInline(t, this) : e;
			}
			em({ text: e, tokens: t }) {
				return t ? this.parser.parseInline(t, this) : e;
			}
			codespan({ text: e }) {
				return e;
			}
			del({ text: e, tokens: t }) {
				return t ? this.parser.parseInline(t, this) : e;
			}
			html({ text: e }) {
				return e;
			}
			text({ text: e }) {
				return e;
			}
			link({ text: e, tokens: t }) {
				return t ? this.parser.parseInline(t, this) : e;
			}
			image({ text: e, tokens: t }) {
				return t ? this.parser.parseInline(t, this) : e;
			}
			br() {
				return "";
			}
			checkbox({ raw: e }) {
				return e;
			}
		};
		var w = class a {
			options;
			renderer;
			textRenderer;
			constructor(e) {
				this.options = e || y, this.options.renderer = this.options.renderer || new L(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new M(), this.textRenderer.parser = this;
			}
			static parse(e, t) {
				return new a(t).parse(e);
			}
			static parseInline(e, t) {
				return new a(t).parseInline(e);
			}
			parse(e) {
				this.renderer.parser = this;
				let t = "";
				for (let n = 0; n < e.length; n++) {
					let s = e[n];
					if (this.options.extensions?.renderers?.[s.type]) {
						let o = s, i = this.options.extensions.renderers[o.type].call({ parser: this }, o);
						if (i !== !1 || ![
							"space",
							"hr",
							"heading",
							"code",
							"table",
							"blockquote",
							"list",
							"checkbox",
							"html",
							"def",
							"paragraph",
							"text"
						].includes(o.type)) {
							t += i || "";
							continue;
						}
					}
					let r = s;
					switch (r.type) {
						case "space":
							t += this.renderer.space(r);
							break;
						case "hr":
							t += this.renderer.hr(r);
							break;
						case "heading":
							t += this.renderer.heading(r);
							break;
						case "code":
							t += this.renderer.code(r);
							break;
						case "table":
							t += this.renderer.table(r);
							break;
						case "blockquote":
							t += this.renderer.blockquote(r);
							break;
						case "list":
							t += this.renderer.list(r);
							break;
						case "checkbox":
							t += this.renderer.checkbox(r);
							break;
						case "html":
							t += this.renderer.html(r);
							break;
						case "def":
							t += this.renderer.def(r);
							break;
						case "paragraph":
							t += this.renderer.paragraph(r);
							break;
						case "text":
							t += this.renderer.text(r);
							break;
						default: {
							let o = "Token with \"" + r.type + "\" type was not found.";
							if (this.options.silent) return console.error(o), "";
							throw new Error(o);
						}
					}
				}
				return t;
			}
			parseInline(e, t = this.renderer) {
				this.renderer.parser = this;
				let n = "";
				for (let s = 0; s < e.length; s++) {
					let r = e[s];
					if (this.options.extensions?.renderers?.[r.type]) {
						let i = this.options.extensions.renderers[r.type].call({ parser: this }, r);
						if (i !== !1 || ![
							"escape",
							"html",
							"link",
							"image",
							"checkbox",
							"strong",
							"em",
							"codespan",
							"br",
							"del",
							"text"
						].includes(r.type)) {
							n += i || "";
							continue;
						}
					}
					let o = r;
					switch (o.type) {
						case "escape":
							n += t.text(o);
							break;
						case "html":
							n += t.html(o);
							break;
						case "link":
							n += t.link(o);
							break;
						case "image":
							n += t.image(o);
							break;
						case "checkbox":
							n += t.checkbox(o);
							break;
						case "strong":
							n += t.strong(o);
							break;
						case "em":
							n += t.em(o);
							break;
						case "codespan":
							n += t.codespan(o);
							break;
						case "br":
							n += t.br(o);
							break;
						case "del":
							n += t.del(o);
							break;
						case "text":
							n += t.text(o);
							break;
						default: {
							let i = "Token with \"" + o.type + "\" type was not found.";
							if (this.options.silent) return console.error(i), "";
							throw new Error(i);
						}
					}
				}
				return n;
			}
		};
		var A = class {
			options;
			block;
			constructor(e) {
				this.options = e || y;
			}
			static passThroughHooks = /* @__PURE__ */ new Set([
				"preprocess",
				"postprocess",
				"processAllTokens",
				"emStrongMask"
			]);
			static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
				"preprocess",
				"postprocess",
				"processAllTokens"
			]);
			preprocess(e) {
				return e;
			}
			postprocess(e) {
				return e;
			}
			processAllTokens(e) {
				return e;
			}
			emStrongMask(e) {
				return e;
			}
			provideLexer(e = this.block) {
				return e ? O.lex : O.lexInline;
			}
			provideParser(e = this.block) {
				return e ? w.parse : w.parseInline;
			}
		};
		function D(a, e) {
			if (Array.isArray(e)) for (let t = 0; t < e.length; t++) a.push(e[t]);
			else a.push(e);
		}
		var J = class {
			defaults = v();
			options = this.setOptions;
			parse = this.parseMarkdown(!0);
			parseInline = this.parseMarkdown(!1);
			Parser = w;
			Renderer = L;
			TextRenderer = M;
			Lexer = O;
			Tokenizer = _;
			Hooks = A;
			constructor(...e) {
				this.use(...e);
			}
			walkTokens(e, t) {
				let n = [];
				for (let s of e) switch (D(n, t.call(this, s)), s.type) {
					case "table": {
						let r = s;
						for (let o of r.header) D(n, this.walkTokens(o.tokens, t));
						for (let o of r.rows) for (let i of o) D(n, this.walkTokens(i.tokens, t));
						break;
					}
					case "list": {
						let r = s;
						D(n, this.walkTokens(r.items, t));
						break;
					}
					default: {
						let r = s;
						this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((o) => {
							let i = r[o].flat(Infinity);
							D(n, this.walkTokens(i, t));
						}) : r.tokens && D(n, this.walkTokens(r.tokens, t));
					}
				}
				return n;
			}
			use(...e) {
				let t = this.defaults.extensions || {
					renderers: {},
					childTokens: {}
				};
				return e.forEach((n) => {
					let s = { ...n };
					if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
						if (!r.name) throw new Error("extension name required");
						if ("renderer" in r) {
							let o = t.renderers[r.name];
							o ? t.renderers[r.name] = function(...i) {
								let l = r.renderer.apply(this, i);
								return l === !1 && (l = o.apply(this, i)), l;
							} : t.renderers[r.name] = r.renderer;
						}
						if ("tokenizer" in r) {
							if (!r.level || r.level !== "block" && r.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
							let o = t[r.level];
							o ? o.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
						}
						"childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
					}), s.extensions = t), n.renderer) {
						let r = this.defaults.renderer || new L(this.defaults);
						for (let o in n.renderer) {
							if (!(o in r)) throw new Error(`renderer '${o}' does not exist`);
							if (["options", "parser"].includes(o)) continue;
							let i = o, l = n.renderer[i], u = r[i];
							r[i] = (...h) => {
								let p = l.apply(r, h);
								return p === !1 && (p = u.apply(r, h)), p || "";
							};
						}
						s.renderer = r;
					}
					if (n.tokenizer) {
						let r = this.defaults.tokenizer || new _(this.defaults);
						for (let o in n.tokenizer) {
							if (!(o in r)) throw new Error(`tokenizer '${o}' does not exist`);
							if ([
								"options",
								"rules",
								"lexer"
							].includes(o)) continue;
							let i = o, l = n.tokenizer[i], u = r[i];
							r[i] = (...h) => {
								let p = l.apply(r, h);
								return p === !1 && (p = u.apply(r, h)), p;
							};
						}
						s.tokenizer = r;
					}
					if (n.hooks) {
						let r = this.defaults.hooks || new A();
						for (let o in n.hooks) {
							if (!(o in r)) throw new Error(`hook '${o}' does not exist`);
							if (["options", "block"].includes(o)) continue;
							let i = o, l = n.hooks[i], u = r[i];
							A.passThroughHooks.has(o) ? r[i] = (h) => {
								if (r.options.async && A.passThroughHooksRespectAsync.has(o)) return (async () => {
									let d = await l.call(r, h);
									return u.call(r, d);
								})();
								let p = l.call(r, h);
								return u.call(r, p);
							} : r[i] = (...h) => {
								if (r.options.async) return (async () => {
									let d = await l.apply(r, h);
									return d === !1 && (d = await u.apply(r, h)), d;
								})();
								let p = l.apply(r, h);
								return p === !1 && (p = u.apply(r, h)), p;
							};
						}
						s.hooks = r;
					}
					if (n.walkTokens) {
						let r = this.defaults.walkTokens, o = n.walkTokens;
						s.walkTokens = function(i) {
							let l = [];
							return l.push(o.call(this, i)), r && D(l, r.call(this, i)), l;
						};
					}
					this.defaults = {
						...this.defaults,
						...s
					};
				}), this;
			}
			setOptions(e) {
				return this.defaults = {
					...this.defaults,
					...e
				}, this;
			}
			lexer(e, t) {
				return O.lex(e, t ?? this.defaults);
			}
			parser(e, t) {
				return w.parse(e, t ?? this.defaults);
			}
			parseMarkdown(e) {
				return (n, s) => {
					let r = { ...s }, o = {
						...this.defaults,
						...r
					}, i = this.onError(!!o.silent, !!o.async);
					if (this.defaults.async === !0 && r.async === !1) return i(/* @__PURE__ */ new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
					if (typeof n > "u" || n === null) return i(/* @__PURE__ */ new Error("marked(): input parameter is undefined or null"));
					if (typeof n != "string") return i(/* @__PURE__ */ new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
					if (o.hooks && (o.hooks.options = o, o.hooks.block = e), o.async) return (async () => {
						let l = o.hooks ? await o.hooks.preprocess(n) : n, h = await (o.hooks ? await o.hooks.provideLexer(e) : e ? O.lex : O.lexInline)(l, o), p = o.hooks ? await o.hooks.processAllTokens(h) : h;
						o.walkTokens && await Promise.all(this.walkTokens(p, o.walkTokens));
						let g = await (o.hooks ? await o.hooks.provideParser(e) : e ? w.parse : w.parseInline)(p, o);
						return o.hooks ? await o.hooks.postprocess(g) : g;
					})().catch(i);
					try {
						o.hooks && (n = o.hooks.preprocess(n));
						let u = (o.hooks ? o.hooks.provideLexer(e) : e ? O.lex : O.lexInline)(n, o);
						o.hooks && (u = o.hooks.processAllTokens(u)), o.walkTokens && this.walkTokens(u, o.walkTokens);
						let p = (o.hooks ? o.hooks.provideParser(e) : e ? w.parse : w.parseInline)(u, o);
						return o.hooks && (p = o.hooks.postprocess(p)), p;
					} catch (l) {
						return i(l);
					}
				};
			}
			onError(e, t) {
				return (n) => {
					if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
						let s = "<p>An error occurred:</p><pre>" + P(n.message + "", !0) + "</pre>";
						return t ? Promise.resolve(s) : s;
					}
					if (t) return Promise.reject(n);
					throw n;
				};
			}
		};
		var q = new J();
		function m(a, e) {
			return q.parse(a, e);
		}
		m.options = m.setOptions = function(a) {
			return q.setOptions(a), m.defaults = q.defaults, ee(m.defaults), m;
		};
		m.getDefaults = v;
		m.defaults = y;
		function zt(...a) {
			return q.use(...a), m.defaults = q.defaults, ee(m.defaults), m;
		}
		m.use = zt;
		m.walkTokens = function(a, e) {
			return q.walkTokens(a, e);
		};
		m.parseInline = q.parseInline;
		m.Parser = w;
		m.parser = w.parse;
		m.Renderer = L;
		m.TextRenderer = M;
		m.Lexer = O;
		m.lexer = O.lex;
		m.Tokenizer = _;
		m.Hooks = A;
		m.parse = m;
		m.options;
		m.setOptions;
		m.walkTokens;
		m.parseInline;
		w.parse;
		O.lex;
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
					return m.parse(props.content, { async: false });
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