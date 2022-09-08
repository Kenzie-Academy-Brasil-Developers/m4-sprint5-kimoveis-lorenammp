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
exports.Properties = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const addresses_entity_1 = require("./addresses.entity");
const categories_entity_1 = require("./categories.entity");
const schedules_entity_1 = require("./schedules.entity");
let Properties = class Properties {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Properties.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => categories_entity_1.Categories, (category) => category.properties),
    __metadata("design:type", categories_entity_1.Categories)
], Properties.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => addresses_entity_1.Addresses, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", addresses_entity_1.Addresses)
], Properties.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => schedules_entity_1.Schedules, (schedule) => schedule.property),
    __metadata("design:type", Array)
], Properties.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Properties.prototype, "sold", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], Properties.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Properties.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Properties.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Properties.prototype, "updatedAt", void 0);
Properties = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], Properties);
exports.Properties = Properties;
