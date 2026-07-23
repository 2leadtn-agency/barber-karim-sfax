;(function () {
  'use strict'

  function injectStyles() {
    if (document.getElementById('lrab-styles')) return

    const css = `
      .lrab-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 9999;
        height: 52px;
        background: #0a0a0a;
        border-top: 1px solid #1f1f1f;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1.25rem;
        font-family: system-ui, sans-serif;
        box-sizing: border-box;
      }
      .lrab-left {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.7);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lrab-brand {
        color: #FFC700;
        font-weight: 600;
      }
      .lrab-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }
      .lrab-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 6px 12px;
        border-radius: 999px;
        border: none;
        cursor: pointer;
        white-space: nowrap;
        font-family: inherit;
      }
      .lrab-btn svg {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
      }
      .lrab-btn-report {
        background: #FFC700;
        color: #0a0a0a;
      }
      .lrab-btn-whatsapp {
        background: #25D366;
        color: #ffffff;
      }
      .lrab-btn-copy {
        background: #1f1f1f;
        color: #ffffff;
        border: 1px solid #333;
      }
      @media (max-width: 640px) {
        .lrab-bar {
          height: auto;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 8px 1rem;
        }
        .lrab-left {
          font-size: 0.75rem;
          text-align: center;
        }
        .lrab-actions {
          justify-content: center;
        }
        .lrab-btn {
          font-size: 0.72rem;
          padding: 5px 10px;
        }
      }
    `

    const style = document.createElement('style')
    style.id = 'lrab-styles'
    style.textContent = css
    document.head.appendChild(style)
  }

  function buildBar() {
    const bar = document.createElement('div')
    bar.className = 'lrab-bar'

    const left = document.createElement('div')
    left.className = 'lrab-left'
    left.innerHTML = '⚡ Aperçu gratuit par <span class="lrab-brand">Lumerank</span>'

    const actions = document.createElement('div')
    actions.className = 'lrab-actions'

    const reportBtn = document.createElement('button')
    reportBtn.className = 'lrab-btn lrab-btn-report'
    reportBtn.type = 'button'
    reportBtn.textContent = '📊 Voir le rapport'
    reportBtn.addEventListener('click', function () {
      const client = window.location.hostname.split('.')[0]
      window.open('https://rapport.2lead.tn?client=' + client, '_blank')
    })

    const whatsappBtn = document.createElement('button')
    whatsappBtn.className = 'lrab-btn lrab-btn-whatsapp'
    whatsappBtn.type = 'button'
    whatsappBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.6C3.5 7.3 7.3 3.5 12 3.5s8.5 3.8 8.5 8.5-3.8 8.2-8.5 8.2Zm4.6-6.3c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.8-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4L9.2 8.6c-.1-.2-.3-.2-.5-.2h-.4c-.2 0-.5.1-.7.3-.2.3-.9 1-.9 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.7.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"></path></svg><span>Partager</span>'
    whatsappBtn.addEventListener('click', function () {
      const text = "Regarde l'aperçu de mon futur site 👉 " + window.location.href
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer')
    })

    const copyBtn = document.createElement('button')
    copyBtn.className = 'lrab-btn lrab-btn-copy'
    copyBtn.type = 'button'
    copyBtn.textContent = '🔗 Copier le lien'
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(window.location.href).then(function () {
        const original = '🔗 Copier le lien'
        copyBtn.textContent = '✓ Copié !'
        setTimeout(function () {
          copyBtn.textContent = original
        }, 2000)
      })
    })

    actions.appendChild(reportBtn)
    actions.appendChild(whatsappBtn)
    actions.appendChild(copyBtn)

    bar.appendChild(left)
    bar.appendChild(actions)

    document.body.appendChild(bar)
    document.body.style.paddingBottom = '60px'
  }

  function initApercuBar() {
    injectStyles()
    buildBar()
  }

  window.initApercuBar = initApercuBar

  document.addEventListener('DOMContentLoaded', function () {
    initApercuBar()
  })
})()
