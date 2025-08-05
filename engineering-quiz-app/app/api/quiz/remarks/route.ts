import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for remarks
const remarks: Array<{
  id: string
  resultId: string
  remarks: string
  submittedAt: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const { resultId, remarks: userRemarks } = await request.json()

    if (!resultId || !userRemarks) {
      return NextResponse.json({ message: "Result ID and remarks are required" }, { status: 400 })
    }

    const remarkRecord = {
      id: Date.now().toString(),
      resultId,
      remarks: userRemarks,
      submittedAt: new Date().toISOString(),
    }

    remarks.push(remarkRecord)

    return NextResponse.json({
      message: "Remarks submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
