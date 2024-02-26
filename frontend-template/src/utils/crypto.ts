/**
 * 加密解密
 */

import * as cryptoJS from "crypto-js";

/**
 * AES
 */
export const AES = {
    /**
     * AES加密
     * @param dataStr 要加密的字符串
     * @param key 用于加密的密钥
     * @param vector 用于加密的向量（IV）
     * @param cipherMode 加密模式，默认为CBC模式
     * @returns
     */
    encrypt(dataStr: string, key: string, vector: string, cipherMode = cryptoJS.mode.CBC): string {
        // 处理Key不足32位的问题
        if (key.length < 32) {
            // 不足
            key = key.padEnd(32, "f");
        }

        // 处理Key超过32位的问题
        if (key.length > 32) {
            // 超过
            key = key.substring(0, 32);
        }

        // 处理IV不足16位的问题
        if (vector.length < 16) {
            // 不足
            vector = vector.padEnd(16, "f");
        }

        // 处理IV超过16位的问题
        if (vector.length > 16) {
            // 超过
            vector = vector.substring(0, 16);
        }

        return cryptoJS.AES.encrypt(dataStr, cryptoJS.enc.Utf8.parse(key), {
            iv: cryptoJS.enc.Utf8.parse(vector),
            mode: cipherMode,
        }).toString();
    },
    /**
     * AES解密
     * @param dataStr 要解密的Base64编码字符串
     * @param key 用于解密的密钥
     * @param vector 用于解密的向量（IV）
     * @param cipherMode 解密模式，默认为CBC模式
     * @returns
     */
    decrypt<T = "string">(dataStr: string, key: string, vector: string, cipherMode = cryptoJS.mode.CBC): T | null {
        // 处理Key不足32位的问题
        if (key.length < 32) {
            // 不足
            key = key.padEnd(32, "f");
        }

        // 处理Key超过32位的问题
        if (key.length > 32) {
            // 超过
            key = key.substring(0, 32);
        }

        // 处理IV不足16位的问题
        if (vector.length < 16) {
            // 不足
            vector = vector.padEnd(16, "f");
        }

        // 处理IV超过16位的问题
        if (vector.length > 16) {
            // 超过
            vector = vector.substring(0, 16);
        }

        let resAESData = cryptoJS.AES.decrypt(dataStr, cryptoJS.enc.Utf8.parse(key), {
            iv: cryptoJS.enc.Utf8.parse(vector),
            mode: cipherMode,
        });
        try {
            let result = resAESData.toString(cryptoJS.enc.Utf8);
            return JSON.parse(result) as T;
        } catch (e) {
            return null;
        }
    },
};
