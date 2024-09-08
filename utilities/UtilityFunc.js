import url from "url";
export function decodeUrl(req){
    const parseUrl = url.parse(req.url,true);
    const queryPara = parseUrl.query || {};
    const pathname = parseUrl.pathname;
    const urlSegment = pathname.split("/").filter((urlseg) => !!urlseg)
     return {
        ...queryPara,
        pathname,
        urlSegment,
        parseUrl
    }
}    