import { Schema, model, Document } from 'mongoose';

export interface ISurvey extends Document {
    id: string;
    title: string;
    description: string;
    createDate: Date;
    lastModifiedDate: Date;
    creatorId: string;
    status: 'draft' | 'published' | 'closed';
    questions: Array<{
        id: string;
        question: string;
        type: 'multiple-choice' | 'single-choice';
        isCustomAnswers: boolean;
        answers: Array<{
            id: string;
            answer: string;
            isMarked: boolean;
        }>;
    }>;
    responses: Array<{
        userId: string;
        responses: Array<{
            questionId: string;
            answerId?: string;
            customAnswer?: string;
        }>;
    }>;
}

const surveySchema = new Schema<ISurvey>({
    id: { type: String, required: true },
    title: { type: String, required: true, minlength: 1, maxlength: 255 },
    description: { type: String, maxlength: 1000 },
    createDate: { type: Date, required: true, default: Date.now },
    lastModifiedDate: { type: Date, required: true, default: Date.now },
    creatorId: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'closed'], required: true, default: 'draft' },
    questions: [
        {
            id: { type: String, required: true },
            question: { type: String, required: true, minlength: 1, maxlength: 1000 },
            type: { type: String, enum: ['multiple-choice', 'single-choice'], required: true },
            isCustomAnswers: { type: Boolean, default: false },
            answers: [
                {
                    id: { type: String, required: true },
                    answer: { type: String, required: true, minlength: 1, maxlength: 500 },
                    isMarked: { type: Boolean, default: false }
                }
            ]
        }
    ],
    responses: [
        {
            userId: { type: String, required: true },
            responses: [
                {
                    questionId: { type: String, required: true },
                    answerId: { type: String },
                    customAnswer: { type: String }
                }
            ]
        }
    ]
});

const Survey = model<ISurvey>('Survey', surveySchema);

export default Survey;
