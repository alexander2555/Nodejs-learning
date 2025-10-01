const createInput = document.getElementById('createInput')
const editModal = document.getElementById('editModal')
const editInput = document.getElementById('editInput')
const idInput = document.getElementById('idInput')

document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id

    remove(id).then(() => {
      target.closest('li').remove()
    })
  }
})

// Обработка событий модального окна
editModal.addEventListener('shown.bs.modal', ({ relatedTarget }) => {
  idInput.value = relatedTarget.dataset.id
  editInput.value = relatedTarget.dataset.title
  editInput.focus()
})
editModal.addEventListener('hide.bs.modal', () => {
  createInput.focus()
  const id = idInput.value
  const title = editInput.value

  // При закрытии модального окна выполнение PUT-запроса и изменение элемента в DOM-дереве
  edit(id, title).then(() => {
    document.querySelector(`span[data-id="${id}"]`).innerText = title
  })
})

async function edit(id, title) {
  await fetch('/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
}

async function remove(id) {
  await fetch('/' + id, {
    method: 'DELETE',
  })
}
