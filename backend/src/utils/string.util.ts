export class StringUtil {

    public static isStringNullOrEmpty(text: string): boolean {
        return (!text || text.trim() == '');
    }

}