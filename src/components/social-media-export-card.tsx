"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle } from "lucide-react"

export function SocialMediaExportCard() {
  const [inputValue, setInputValue] = useState('')
  const [includeNested, setIncludeNested] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <CardContent className="p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Export Social Media Comments</h2>
          <p className="text-sm text-gray-600 mt-2">Easily exports all comments from your social media posts to Excel file.</p>
        </div>

        <div className="relative">
          <Input
            type="text"
            placeholder="https://www.facebook.com/page/videos/1234567890/"
            className="w-full pl-4 pr-12 py-3 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition duration-200"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-600">
            <PlusCircle size={24} />
          </button>
        </div>

        <div className="text-xs text-blue-600 hover:underline cursor-pointer">
          Where do I find url? (view example)
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {['facebook', 'twitter', 'instagram', 'youtube', 'tiktok', 'vk', 'twitch', 'steam'].map((platform) => (
              <img key={platform} src={`/${platform}-icon.svg`} alt={platform} className="w-6 h-6" />
            ))}
          </div>
          <span className="text-xs text-gray-600">supported</span>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="nestedComments" 
            checked={includeNested}
            onCheckedChange={(checked) => setIncludeNested(checked as boolean)}
          />
          <label htmlFor="nestedComments" className="text-sm text-gray-700">
            Include nested comments
          </label>
        </div>

        <button
          className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${
            inputValue ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600' : 'bg-gray-300 cursor-not-allowed'
          } transition duration-200 uppercase text-sm tracking-wide`}
          disabled={!inputValue}
        >
          Start Export Process
        </button>
      </CardContent>
    </Card>
  )
}