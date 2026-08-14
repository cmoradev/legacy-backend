#!/bin/bash
#
# init-storage.sh
#
# Crea de forma idempotente la estructura de directorios que la aplicación
# ERP API utiliza para almacenar facturas, comprobantes, CSD,
# logos y otros recursos.
#
# Características:
#   - Nunca borra contenido existente.
#   - Si la estructura ya está completa, informa y sale.
#   - Crea archivos `.gitkeep` vacíos para que Git trackee los directorios.
#   - Se puede ejecutar múltiples veces sin riesgo.
#
# Uso:
#   $ npm run init:storage
#   $ bash scripts/init-storage.sh
#

set -u

# Resuelve la ruta del proyecto (directorio padre de scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

STORAGE_DIR="${PROJECT_DIR}/storage"

# Lista de subdirectorios (relativos a storage/) que deben existir.
SUBDIRS=(
  "CSD"
)

echo "Inicializando storage en: ${STORAGE_DIR}"

# Si storage/ no existe, se crea desde cero.
if [ ! -d "${STORAGE_DIR}" ]; then
  echo "  -> storage/ no existe. Creando estructura completa..."
  mkdir -p "${STORAGE_DIR}"

  for sub in "${SUBDIRS[@]}"; do
    target="${STORAGE_DIR}/${sub}"
    mkdir -p "${target}"
    echo "  -> creado: storage/${sub}/"
  done

  echo "Estructura de storage/ creada correctamente."
  exit 0
fi

echo "  -> storage/ ya existe. Verificando subdirectorios..."

# Estado: si todos los subdirectorios ya existen, la estructura está completa.
missing=0
created=0

for sub in "${SUBDIRS[@]}"; do
  target="${STORAGE_DIR}/${sub}"
  if [ ! -d "${target}" ]; then
    echo "  -> creando faltante: storage/${sub}/"
    mkdir -p "${target}"
    created=1
  fi
done

if [ "${created}" -eq 0 ]; then
  echo "storage/ ya está inicializado."
else
  echo "Se completaron directorios faltantes de storage/."
fi

exit 0