import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ShortcutsModal } from './components/ui/ShortcutsModal'
import { ArithmeticPage } from './pages/ArithmeticPage'
import { MatrixPage } from './pages/MatrixPage'

function Layout({ children }: { children: React.ReactNode }) {
  const [shortcutsOpen, setShortcutsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col font-mono bg-background text-on-surface max-w-container mx-auto w-full">
      <Navbar onOpenShortcuts={() => setShortcutsOpen(true)} />
      <main className="flex-1 flex flex-col px-gutter">{children}</main>
      <Footer />
      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/arithmetic"
          element={
            <Layout>
              <ArithmeticPage />
            </Layout>
          }
        />
        <Route
          path="/matrix"
          element={
            <Layout>
              <MatrixPage />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/arithmetic" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
