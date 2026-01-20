import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, projectType } = body;

        // Validation
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and Email are required' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'contact_submissions.json');

        let submissions = [];

        // Read existing
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            try {
                submissions = JSON.parse(fileContent);
            } catch (e) {
                // If file is corrupt, start fresh
                submissions = [];
            }
        }

        // Add new
        const newSubmission = {
            id: Date.now().toString(),
            name,
            email,
            projectType: projectType || 'Non specificato',
            submittedAt: new Date().toISOString()
        };

        submissions.push(newSubmission);

        // Save
        fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

        return NextResponse.json({ success: true, message: 'Message saved' });

    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
