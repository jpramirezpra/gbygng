"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StatusFilterPipe = (function () {
    function StatusFilterPipe() {
    }
    StatusFilterPipe.prototype.transform = function (items, filter, stringFilter) {
        if (items != undefined) {
            var preFilter;
            //filterStatus
            preFilter = items.filter(function (item) { return filter.indexOf(item.StatusId) >= 0; });
            //filterNames
            if (stringFilter != undefined && stringFilter.length > 0) {
                return preFilter.filter(function (item) { return (item.FirstName + " " + item.LastName).indexOf(stringFilter) >= 0; });
            }
            else {
                return preFilter;
            }
        }
        else {
            return items;
        }
    };
    return StatusFilterPipe;
}());
StatusFilterPipe = __decorate([
    core_1.Pipe({
        name: 'statusFilter',
        pure: false
    })
], StatusFilterPipe);
exports.StatusFilterPipe = StatusFilterPipe;
//# sourceMappingURL=directives.js.map