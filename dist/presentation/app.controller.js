function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
import { Controller, Get, Next, Post, Req, Res } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { PostGraphileResponseNode } from "postgraphile";
import { AppScenario } from "../application/scenario/app.scenario.js";
import { middleware } from "./middleware/index.js";
export class AppController {
    healthCheck() {
        return this.appScenario.getHello();
    }
    graphiql(request, response, next) {
        middleware.graphiqlRouteHandler?.(new PostGraphileResponseNode(request, response, next));
    }
    graphql(request, response, next) {
        middleware.graphqlRouteHandler(new PostGraphileResponseNode(request, response, next));
    }
    constructor(appScenario){
        this.appScenario = appScenario;
    }
}
_ts_decorate([
    Get(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", String)
], AppController.prototype, "healthCheck", null);
_ts_decorate([
    Get(middleware.graphiqlRoute),
    ApiOperation({
        summary: 'GraphiQL UI',
        description: `GraphQLを確認するためのUIを提供します。

クエリの確認や実行が可能です。

NODE_ENV=localの場合のみ有効です。`
    }),
    _ts_param(0, Req()),
    _ts_param(1, Res()),
    _ts_param(2, Next()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response,
        Function
    ]),
    _ts_metadata("design:returntype", void 0)
], AppController.prototype, "graphiql", null);
_ts_decorate([
    Post(middleware.graphqlRoute),
    ApiOperation({
        summary: 'GraphQL Endpoint',
        description: `GraphQLエンドポイントです。`
    }),
    ApiBody({
        type: Object,
        description: `GraphQLのクエリを指定します。`
    }),
    ApiUnauthorizedResponse({
        description: '認証エラー'
    }),
    _ts_param(0, Req()),
    _ts_param(1, Res()),
    _ts_param(2, Next()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response,
        Function
    ]),
    _ts_metadata("design:returntype", void 0)
], AppController.prototype, "graphql", null);
AppController = _ts_decorate([
    Controller(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AppScenario === "undefined" ? Object : AppScenario
    ])
], AppController);

//# sourceMappingURL=app.controller.js.map