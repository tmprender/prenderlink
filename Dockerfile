FROM python:3.11

# Copy html
COPY index.html /

# Run http server
EXPOSE 443
CMD ["python", "-m", "http.server", "443"]
