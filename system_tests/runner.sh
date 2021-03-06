# Runner config
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )" # Location of the runner
LOG_PREFIX="[run all]"


log() {
  echo "${LOG_PREFIX} ${1}"
}

env_up() {
  log "Setting up test environment"
  docker-compose --project-directory "${DIR}/docker" --file "${DIR}/docker/docker-compose.yml" up -d
}

env_down() {
  log "Shutting down test environment"
  docker-compose --project-directory "${DIR}/docker" --file "${DIR}/docker/docker-compose.yml" down
}

reset_emulators() {
  log "Resetting emulators" # TODO
}


# Global init
set -euo pipefail


# Main logic
TEST_FILES=$(find ${DIR}/tests -type f -name "*.ts")

env_up

for TEST_FILE in ${TEST_FILES}; do
  log "Running ${TEST_FILE}"

  if ts-node "$TEST_FILE"; then
    log "$TEST_FILE finished successfully"
  else
    log "$TEST_FILE falied"
    env_down
    exit 1
  fi

  reset_emulators
done

env_down
