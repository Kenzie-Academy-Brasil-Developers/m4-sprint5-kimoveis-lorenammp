"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedules = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const properties_entity_1 = require("./properties.entity");
const user_entity_1 = require("./user.entity");
let Schedules = class Schedules {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Schedules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.schedule, {
        eager: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Schedules.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => properties_entity_1.Properties, (property) => property.schedule, {
        eager: true,
    }),
    __metadata("design:type", properties_entity_1.Properties)
], Schedules.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Schedules.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", String)
], Schedules.prototype, "hour", void 0);
Schedules = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], Schedules);
exports.Schedules = Schedules;
