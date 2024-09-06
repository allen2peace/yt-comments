'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Download, ExternalLink, MessageSquare, Send } from "lucide-react"

export function ExportCompletion() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">91</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Replies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">85</div>
              <div className="text-sm text-muted-foreground">Exported</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              VISIT URL
            </Button>
            <Button variant="outline" size="sm">
              <Send className="mr-2 h-4 w-4" />
              SEND FEEDBACK
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Export completed. Your file is ready for download.</h2>
          <div className="bg-green-500 text-white p-4 rounded-md flex items-center justify-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Export completed. Your file is ready for download.</span>
          </div>
          <div className="flex justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD EXCEL FILE
            </Button>
          </div>
          <p className="text-sm text-center text-blue-600 hover:underline cursor-pointer">
            Why some comments are not exported?
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-sm text-muted-foreground">
          <p>
            If the export time is too long, please return to this page later to view the conversion result. Sometimes, if
            the conversion server is busy, export queuing will take a while.
          </p>
          <p>
            The conversion status of your export is automatically updated and usually does not need to be refreshed. Of
            course, if you are not sure, you can also manually refresh the page.
          </p>
          <p>
            The export will be saved for 5 days, during which time you can download it. After 5 days, these files will be
            automatically deleted and will no longer be valid.
          </p>
          <p>
            We can export most international languages, including Arabic and Cyrillic languages. Depending on your
            spreadsheet software, some versions of Excel may not present the characters in their correct format.
            Uploading the exported file to Google Docs usually works!
          </p>
          <p className="text-center">
            If you can't open provided excel file, open it online using{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Office Web Apps
            </a>
            .
          </p>
          <div className="flex justify-center w-full">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">EXPORT ANOTHER</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}