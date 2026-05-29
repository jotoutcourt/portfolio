import http.server, os
os.chdir('/Users/jordanjoin/Downloads/onfaitdesbulles-main-3')
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(('', 8899), handler)
httpd.serve_forever()
