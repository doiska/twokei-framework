"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var path_1 = require("path");
var loader_1 = __importDefault(require("../utils/loader"));
var CommandHandler = /** @class */ (function (_super) {
    __extends(CommandHandler, _super);
    function CommandHandler(client, dir) {
        var _this = _super.call(this) || this;
        _this.setup(client, dir);
        _this.client = client;
        return _this;
    }
    CommandHandler.prototype.setup = function (client, dir) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, file, fileName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, _a = loader_1.default(path_1.join(__dirname, 'commands'));
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], file = _b[0], fileName = _b[1];
                        return [4 /*yield*/, this.registerCommand(client, file, fileName)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommandHandler.prototype.registerCommand = function (client, file, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var command, _a, name, callback;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(file)); })];
                    case 1:
                        command = _b.sent();
                        if (command.default && Object.keys(command).length === 1)
                            command = command.default;
                        _a = command, name = _a.name, callback = _a.callback;
                        if (!callback)
                            throw new Error("No callback found on \"" + fileName + "\".");
                        _super.prototype.set.call(this, name !== null && name !== void 0 ? name : fileName, command);
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandHandler.prototype.unRegisterCommand = function (name) {
        return _super.prototype.delete.call(this, name);
    };
    CommandHandler.prototype.performCommand = function (commandName, message) {
        var filteredMessage = this.filterMessage('2!', message);
        if (!filteredMessage)
            return;
        var command = filteredMessage.command;
        try {
            var response = command.callback({ client: this.client, message: message, args: [] });
            if (!response)
                return;
            if (typeof response === 'string') {
                message.reply({ content: response });
            }
            else if (typeof response === 'object') {
                if (response.custom) {
                    message.reply(response);
                }
                else {
                    var embeds = Array.isArray(response) ? response : [response];
                    message.reply({ embeds: embeds });
                }
            }
        }
        catch (e) {
            console.log("Couldn't perform command " + commandName + ".");
        }
    };
    CommandHandler.prototype.filterMessage = function (prefix, message) {
        var content = message.content;
        if (!content.toLowerCase().startsWith(prefix))
            return;
        if (message.author.bot)
            return;
        content = content.substring(prefix.length);
        var args = content.split(/[ ]+/g);
        var first = args.shift();
        if (!first)
            return;
        var commandName = first.toLowerCase();
        var command = this.get(commandName);
        if (!command)
            return;
        //TODO: slash check
        return {
            prefix: prefix,
            name: commandName,
            command: command
        };
    };
    return CommandHandler;
}(discord_js_1.Collection));
exports.default = CommandHandler;
