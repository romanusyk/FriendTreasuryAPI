# Create volume
# Run this only for first time
mkdir ~/database

# Run only main frontend version
docker-compose up -d

# Run both old and new frontends
# New will be available on port :8008
docker-compose -f docker-compose.yaml -f docker-compose-new-frontend.yaml up -d

