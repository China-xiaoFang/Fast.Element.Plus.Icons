/**
 *
 * @export
 * @enum {string}
 */
export enum AppEnvironmentEnum {
    /**
     * 网页
     */
    Web = 1,
    /**
     * Pc
     */
    PC = 2,
    /**
     * 微信小程序
     */
    WeChatMiniProgram = 4,
    /**
     * 安卓App
     */
    AndroidApp = 8,
    /**
     * IOSApp
     */
    IOSApp = 16,
    /**
     * 其他
     */
    Other = 512,
}
