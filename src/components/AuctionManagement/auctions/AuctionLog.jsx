import { MinusCircle, Pencil, PlusCircle } from 'lucide-react'
import React from 'react'

const AuctionLog = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 col-span-12 space-y-6 xl:col-span-4">
          <h1 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
            Recent Audit Log
          </h1>
          <div>
            <div className="flex items-start gap-3 py-4 border-b border-dashed">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Pencil size={18} />
              </div>

              <div>
                <p className="text-gray-800 font-bold">
                  Admin John edited auction #1234
                </p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
            </div>

            {/* Closed Auction */}
            <div className="flex items-start gap-3 py-4 border-b border-dashed">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                <MinusCircle size={18} />
              </div>

              <div>
                <p className="text-gray-800 font-bold">
                  Admin Sarah closed auction #1233
                </p>
                <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
              </div>
            </div>

            {/* Created Auction */}
            <div className="flex items-start gap-3 py-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <PlusCircle size={18} />
              </div>

              <div>
                <p className="text-gray-800 font-bold">
                  Admin Mike created new auction
                </p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default AuctionLog