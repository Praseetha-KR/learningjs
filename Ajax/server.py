import BaseHTTPServer,random

class Handler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(request):
        request.send_response(200);
        request.send_header("Content-type", "text/html")
        request.send_header("Access-Control-Allow-Origin", "*")
        request.end_headers();
        request.wfile.write(random.randint(0,10**9));


if __name__ == '__main__':
    httpd = BaseHTTPServer.HTTPServer(('',8002),Handler)
    print ("Server Started");
    try:
        httpd.serve_forever();
    except KeyboardInterrupt:
        pass
    httpd.server_close()