document.addEventListener('DOMContentLoaded', () => {
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

  tracks.forEach(createReel)

  function getSymbolHeight(track) {
    return track.querySelector('.symbol').offsetHeight
  }

  function spinTrack(track, index) {
    track.style.transition = 'none'
    track.style.transform = 'translateY(0px)'

    setTimeout(() => {
      const symbolHeight = getSymbolHeight(track)

      track.style.transition = 'transform 2s cubic-bezier(.1,.7,.2,1)'

      const randomIndex = Math.floor(Math.random() * 25) + 10

      const offset = randomIndex * symbolHeight

      track.style.transform = `translateY(-${offset}px)`
    }, index * 400)
  }

  lever.addEventListener('click', () => {
    tracks.forEach(spinTrack)
  })
})
document.querySelectorAll('.cardFlip-content').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped')
  })
})
