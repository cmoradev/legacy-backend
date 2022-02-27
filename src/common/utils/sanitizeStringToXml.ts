export function sanitizeStringToXml(string: string, ignore = undefined): string {
    const map = {
        '>': '&gt;'
        , '<': '&lt;'
        , "'": '&apos;'
        , '"': '&quot;'
        , '&': '&amp;'
    }

    if (string === null || string === undefined) return;

    ignore = (ignore || '').replace(/[^&"<>\']/g, '');
    const pattern = '([&"<>\'])'.replace(new RegExp('[' + ignore + ']', 'g'), '');
    return string.replace(new RegExp(pattern, 'g'), (str, item) => map[item])
}

