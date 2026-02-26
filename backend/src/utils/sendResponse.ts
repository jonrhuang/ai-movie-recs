export function sendResponse(res: any, statusCode: number, contentType: string, data: any) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(JSON.stringify(data));
} 