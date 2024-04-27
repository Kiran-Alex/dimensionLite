type objecttype = {
    username: string | undefined,
    repository: string | undefined
}
export function linkParser(url:string|undefined|null) {
    const obj:objecttype = {
        username: undefined,
        repository: undefined
    };
    const regex = /https:\/\/github.com\/([^\/]+)\/([^\/]+)/;
    const match = url ? url.match(regex) : null;
  
    if (match) {
        obj.username = match[1];
        obj.repository = match[2];
    } else {
        console.log("Invalid URL format");
    }
  
    return obj;
  }
  
