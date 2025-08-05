'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress)
    }
  }, [])

  const connect = async () => {
    const { ethereum } = window

    if (!ethereum) {
      setError('MetaMask yüklü değil veya erişilemedi.')
      return
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' }) as string[]

      if (!accounts || accounts.length === 0) {
        setError('MetaMask hesabı bulunamadı.')
        return
      }

      setAddress(accounts[0])
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Bağlantı hatası oluştu.')
    }
  }

  const disconnect = () => {
    setAddress(null)
  }

  return (
    <div className="text-white text-center space-y-2">
      {address ? (
        <div>
          <p>Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <button onClick={disconnect} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={connect} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded">
          Connect With Metamask
        </button>
      )}

      {error && <p className="text-red-300">{error}</p>}
    </div>
  )
}
