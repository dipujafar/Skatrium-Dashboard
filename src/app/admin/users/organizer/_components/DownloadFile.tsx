"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDownToLine, Upload } from "lucide-react"

export default function DownloadFile() {
  const [uploadedFile, setUploadedFile] = useState({
    name: "Event safety policy.pdf",
    uploadedBy: "Jon Smith",
    uploadedAgo: "2 hours ago",
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        uploadedBy: "You",
        uploadedAgo: "just now",
      })
    }
  }

  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-yellow-600/20 rounded flex items-center justify-center">
          <span className="text-yellow-600 text-xs font-bold">PDF</span>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{uploadedFile.name}</p>
          <p className="text-gray-400 text-xs">
            {uploadedFile.uploadedBy} • {uploadedFile.uploadedAgo}
          </p>
        </div>
        <label className="cursor-pointer">
          <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
          <div className="p-2 hover:bg-gray-700 rounded transition">
            <ArrowDownToLine className="w-6 h-6 text-gray-400" />
          </div>
        </label>
      </div>
    </div>
  )
}
