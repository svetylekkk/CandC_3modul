console.log('JS работает')

// --- ИГРА С КУБИКОМ ---

const dice = document.querySelector('.dice')
const chip = document.querySelector('.bluechip')

const modal = document.getElementById('modal')
const modalText = document.getElementById('modal-text')
const closeModal = document.getElementById('closeModal')

let currentStep = 0
let isRolling = false

const positions = [
  { top: 47, left: 76 },
  { top: 47, left: 62 },
  { top: 47, left: 48 },
  { top: 47, left: 34 },
  { top: 47, left: 20 },
  { top: 47, left: 6 },
  { top: 32, left: 6 },
  { top: 17, left: 6 },
  { top: 7, left: 6 },
  { top: 7, left: 20 },
  { top: 7, left: 34 },
  { top: 7, left: 48 },
  { top: 7, left: 62 },
  { top: 7, left: 76 }
]

const cellTypes = {
  2: 'cherry',
  4: 'star',
  6: 'cherry',
  8: 'question',
  9: 'orange',
  11: 'star',
  12: 'question',
  13: 'orange'
}

const messages = {
  cherry: 'Отлично! Ты получаешь скидку 5%',
  orange: 'Отлично! Ты получаешь скидку 5%',
  star: 'Упс((( Ты возвращаешься в начало.',
  question: 'ОГО! Ты получаешь 50% скидку!'
}

function getRandomDiceValue() {
  return Math.floor(Math.random() * 6) + 1
}

function setChipPosition(step) {
  chip.style.top = `${positions[step].top}vw`
  chip.style.left = `${positions[step].left}vw`
}

function showModal(text) {
  modalText.textContent = text
  modal.classList.add('show')
}

function hideModal() {
  modal.classList.remove('show')
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function moveChip(steps) {
  for (let i = 0; i < steps; i++) {
    currentStep = (currentStep + 1) % positions.length
    setChipPosition(currentStep)

    chip.style.transform = 'scale(1.06)'
    await wait(220)

    chip.style.transform = 'scale(1)'
    await wait(260)
  }
}

async function returnToStart() {
  await wait(500)
  currentStep = 0
  setChipPosition(currentStep)
}

async function handleCellAction() {
  const cellType = cellTypes[currentStep]
  if (!cellType) return

  showModal(messages[cellType])

  if (cellType === 'star') {
    await returnToStart()
  }
}

async function rollDice() {
  if (isRolling) return

  isRolling = true
  dice.disabled = true

  const finalValue = getRandomDiceValue()

  await wait(1000)
  await moveChip(finalValue)
  await handleCellAction()

  dice.disabled = false
  isRolling = false
}

dice.addEventListener('click', rollDice)
closeModal.addEventListener('click', hideModal)

modal.addEventListener('click', (e) => {
  if (e.target === modal) hideModal()
})

setChipPosition(currentStep)

// --- СТИКЕРЫ ---

const stickers = document.querySelectorAll('.stik1, .stik2, .stik3, .stik4')

stickers.forEach((sticker) => {
  sticker.addEventListener('click', () => {
    sticker.classList.add('sticker-fall')
  })
})

// --- 🎴 КАРТОЧКИ (ИСПРАВЛЕНО) ---

document.querySelectorAll('.cardFlip-content').forEach((card) => {
  card.addEventListener('click', () => {
    console.log('CARD CLICK')
    card.classList.toggle('is-flipped')
  })
})

// --- 🎰 СЛОТ ---

const tracks = [
  document.getElementById('track1'),
  document.getElementById('track2'),
  document.getElementById('track3')
]

const lever = document.querySelector('.point')

const icons = [
  './images/sl1.svg',
  './images/sl2.svg',
  './images/sl3.svg',
  './images/sl4.svg',
  './images/sl5.svg',
  './images/sl6.svg',
  './images/sl7.svg',
  './images/sl8.svg'
]

function createReel(track) {
  for (let i = 0; i < 40; i++) {
    const icon = icons[Math.floor(Math.random() * icons.length)]

    const div = document.createElement('div')
    div.classList.add('symbol')

    const img = document.createElement('img')
    img.src = icon

    div.appendChild(img)
    track.appendChild(div)
  }
}

tracks.forEach((track) => createReel(track))

lever.addEventListener('click', () => {
  tracks.forEach((track, index) => {
    track.style.transition = 'none'
    track.style.transform = 'translateY(0)'

    setTimeout(() => {
      track.style.transition = 'transform 2s cubic-bezier(.1,.7,.2,1)'

      const randomIndex = Math.floor(Math.random() * 10) + 5
      const offset = randomIndex * 11

      track.style.transform = `translateY(-${offset}vw)`
    }, index * 400)
  })
})
