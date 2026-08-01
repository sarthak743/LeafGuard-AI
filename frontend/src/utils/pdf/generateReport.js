import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import React from 'react'
import { createRoot } from 'react-dom/client'
import PDFReport from '../../components/pdf/PDFReport.jsx'

export async function generateReport(result, uploadedImage) {
  if (!result || !result.success) return

  // Format date & time
  const now = new Date()
  const generatedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const generatedTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  // Format filename
  const plant = result?.prediction?.details?.plant || 'Plant'
  const disease = result?.prediction?.display_name || 'Diagnosis'
  const dateIso = now.toISOString().split('T')[0]
  const cleanPlant = plant.replace(/[^a-zA-Z0-9]/g, '_')
  const cleanDisease = disease.replace(/[^a-zA-Z0-9]/g, '_')
  const filename = `LeafGuard_${cleanPlant}_${cleanDisease}_${dateIso}.pdf`

  // Inject CSS override styles for off-screen rendering
  const styleEl = document.createElement('style')
  styleEl.id = 'pdf-export-style'
  styleEl.innerHTML = `
    .pdf-export-root * {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  `
  document.head.appendChild(styleEl)

  // Step 1: Create off-screen container for DOM Measurement Pass
  const measureContainer = document.createElement('div')
  measureContainer.className = 'pdf-export-root'
  measureContainer.style.position = 'fixed'
  measureContainer.style.left = '-9999px'
  measureContainer.style.top = '-9999px'
  measureContainer.style.width = '800px'
  measureContainer.style.zIndex = '-9999'
  document.body.appendChild(measureContainer)

  const measureRoot = createRoot(measureContainer)

  return new Promise((resolve, reject) => {
    // Render unpaginated measurement DOM
    measureRoot.render(
      React.createElement(PDFReport, {
        result,
        uploadedImage,
        generatedDate,
        generatedTime,
        pages: null,
      })
    )

    setTimeout(async () => {
      try {
        const reportMeasureEl = measureContainer.firstElementChild || measureContainer

        // Measure heights of all sections
        const getSectionHeight = (selector) => {
          const el = reportMeasureEl.querySelector(`[data-pdf-section="${selector}"]`)
          return el ? el.offsetHeight : 0
        }

        const headerHeight = getSectionHeight('header')

        const sectionOrder = ['image', 'diagnosis', 'row1', 'row2', 'row3', 'action', 'weather']
        const availableSections = sectionOrder.filter((key) => getSectionHeight(key) > 0)

        // Page container parameters (w=800px, h=1131px, p-10=80px total vertical padding)
        const PAGE_PRINTABLE_HEIGHT = 1131 - 80 // 1051px
        const SECTION_GAP = 20 // gap-5 in Tailwind

        // Calculate page distribution
        const pages = []
        let currentPage = []
        let currentPageHeight = headerHeight + SECTION_GAP // Starts with Header on Page 1

        for (const sectionKey of availableSections) {
          const sHeight = getSectionHeight(sectionKey)

          // Check if adding section to currentPage exceeds printable height
          const testHeight = currentPageHeight + sHeight + SECTION_GAP

          if (currentPage.length > 0 && testHeight > PAGE_PRINTABLE_HEIGHT) {
            // Push currentPage bucket and start a new page
            pages.push(currentPage)
            currentPage = [sectionKey]
            currentPageHeight = sHeight + SECTION_GAP
          } else {
            currentPage.push(sectionKey)
            currentPageHeight += sHeight + SECTION_GAP
          }
        }

        if (currentPage.length > 0) {
          pages.push(currentPage)
        }

        // Unmount measure container
        measureRoot.unmount()
        document.body.removeChild(measureContainer)

        // Step 2: Create off-screen container for Paginated Render
        const exportContainer = document.createElement('div')
        exportContainer.className = 'pdf-export-root'
        exportContainer.style.position = 'fixed'
        exportContainer.style.left = '-9999px'
        exportContainer.style.top = '-9999px'
        exportContainer.style.width = '800px'
        exportContainer.style.zIndex = '-9999'
        document.body.appendChild(exportContainer)

        const exportRoot = createRoot(exportContainer)

        exportRoot.render(
          React.createElement(PDFReport, {
            result,
            uploadedImage,
            generatedDate,
            generatedTime,
            pages,
          })
        )

        // Wait for paginated DOM to settle
        setTimeout(async () => {
          try {
            const pageElements = exportContainer.querySelectorAll('.pdf-page')

            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: 'a4',
            })

            const pdfWidth = pdf.internal.pageSize.getWidth() // 210mm
            const pdfHeight = pdf.internal.pageSize.getHeight() // 297mm

            for (let i = 0; i < pageElements.length; i++) {
              const pageEl = pageElements[i]

              const canvas = await html2canvas(pageEl, {
                scale: 2, // 2x High-DPI for crisp text
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#F9FBF8',
                windowWidth: 800,
                windowHeight: 1131,
              })

              const imgData = canvas.toDataURL('image/jpeg', 0.95)

              if (i > 0) {
                pdf.addPage()
              }

              pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, '', 'FAST')
            }

            pdf.save(filename)

            // Cleanup
            exportRoot.unmount()
            document.body.removeChild(exportContainer)
            const injectedStyle = document.getElementById('pdf-export-style')
            if (injectedStyle) document.head.removeChild(injectedStyle)

            resolve()
          } catch (err) {
            console.error('[generateReport] Paginated PDF export error:', err)
            try {
              exportRoot.unmount()
              document.body.removeChild(exportContainer)
              const injectedStyle = document.getElementById('pdf-export-style')
              if (injectedStyle) document.head.removeChild(injectedStyle)
            } catch (_) {}
            reject(err)
          }
        }, 500)
      } catch (err) {
        console.error('[generateReport] Measurement pass error:', err)
        try {
          measureRoot.unmount()
          document.body.removeChild(measureContainer)
          const injectedStyle = document.getElementById('pdf-export-style')
          if (injectedStyle) document.head.removeChild(injectedStyle)
        } catch (_) {}
        reject(err)
      }
    }, 400)
  })
}
