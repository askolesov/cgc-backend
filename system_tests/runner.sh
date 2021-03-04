# Runner config
TESTS_DIR=${1:-"system_tests"}  # First arg is the location of the directory where to look for tests. Default value is system_tests.
LOG_PREFIX="[run all]"

# App config
APP_IMAGE_NAME="cgc-cloud"
APP_PORT="6000"

# Emulators config
# TODO: ...

log() {
  echo "${LOG_PREFIX} ${1}"
}

start_app() {
  log "Running app"
  
  local container_id=$(docker run -dt --rm -e PORT=${APP_PORT} ${APP_IMAGE_NAME})

  # Setting return value. It's name - 1st param.
  local __resultvar=$1
  eval $__resultvar="'${container_id}'"
}

stop_app() {
  log "Stopping app"

  local container_id=$1
  docker kill "${container_id}"
}

start_emulators() {
  log "Running emulators"
}

stop_emulators() {
  log "Stopping emulators"
}

reset_emulators() {
  log "Resetting emulators"

  # Fixme: implement normal logic
  stop_emulators
  start_emulators
}

# Global init
set -euo pipefail

# Main logic
TEST_FILES=$(find ${TESTS_DIR} -type f -name "*.ts")

start_app CONTAINER_ID
start_emulators

for TEST_FILE in ${TEST_FILES}; do
  log "Running ${TEST_FILE}"

  if ts-node "$TEST_FILE"; then
    log "$TEST_FILE finished successfully"
  else
    log "$TEST_FILE falied"
    exit 1
  fi

  reset_emulators
done

stop_app $CONTAINER_ID
stop_emulators
