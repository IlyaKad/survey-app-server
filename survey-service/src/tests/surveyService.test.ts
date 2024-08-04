import mongoose from 'mongoose';
import Survey, { ISurvey } from '../models/Survey';
import SurveyService from '../services/surveyService';

jest.mock('../models/Survey');

describe('SurveyService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSurvey', () => {
    it('should create and return a new survey', async () => {
      const surveyData: Partial<ISurvey> = {
        id: 'surveyId',
        title: 'Test Survey',
        description: 'Test Description',
        createDate: new Date(),
        lastModifiedDate: new Date(),
        creatorId: 'userId',
        status: 'draft',
        questions: [
          {
            id: 'questionId',
            question: 'testQuestion',
            type: 'single-choice',
            isCustomAnswers: true,
            answers: [
              {
                id: 'answerId',
                answer: 'testAnswer',
                isMarked: false
              }
            ]
          }
        ],
        responses: [
          {
            userId: 'userId',
            responses: [
              {
                questionId: 'questionId'
              }
            ]
          }
        ],
      };

      const savedSurvey = new Survey(surveyData);
      savedSurvey._id = new mongoose.Types.ObjectId();

      (Survey.prototype.save as jest.Mock).mockResolvedValue(savedSurvey);

      const result = await SurveyService.createSurvey(surveyData as ISurvey);

      expect(result).toEqual(savedSurvey);
      expect(Survey.prototype.save).toHaveBeenCalled();
    });
  });
});

describe('getUserSurveys', () => {
  it('should return surveys for a specific user', async () => {
    const userId = 'userId';
    const surveys: Partial<ISurvey>[] = [
      {
        id: 'surveyId',
        title: 'Test Survey',
        description: 'Test Description',
        createDate: new Date(),
        lastModifiedDate: new Date(),
        creatorId: 'userId',
        status: 'draft',
        questions: [
          {
            id: 'questionId',
            question: 'testQuestion',
            type: 'single-choice',
            isCustomAnswers: true,
            answers: [
              {
                id: 'answerId',
                answer: 'testAnswer',
                isMarked: false
              }
            ]
          }
        ],
        responses: [
          {
            userId: 'userId',
            responses: [
              {
                questionId: 'questionId'
              }
            ]
          }
        ],
      },
      {
        id: 'surveyId',
        title: 'Test Survey',
        description: 'Test Description',
        createDate: new Date(),
        lastModifiedDate: new Date(),
        creatorId: 'userId',
        status: 'draft',
        questions: [
          {
            id: 'questionId',
            question: 'testQuestion',
            type: 'single-choice',
            isCustomAnswers: true,
            answers: [
              {
                id: 'answerId',
                answer: 'testAnswer',
                isMarked: false
              }
            ]
          }
        ],
        responses: [
          {
            userId: 'userId',
            responses: [
              {
                questionId: 'questionId'
              }
            ]
          }
        ],
      }
    ];

    (Survey.find as jest.Mock).mockResolvedValue(surveys);

    const result = await SurveyService.getUserSurveys(userId);

    expect(result).toEqual(surveys);
    expect(Survey.find).toHaveBeenCalledWith({ creatorId: userId });
  });
});

describe('getSurveyById', () => {
  it('should return a survey by id', async () => {
    const surveyId = 'surveyId';
    const survey: Partial<ISurvey> = {
      id: 'surveyId',
      title: 'Test Survey',
      description: 'Test Description',
      createDate: new Date(),
      lastModifiedDate: new Date(),
      creatorId: 'userId',
      status: 'draft',
      questions: [
        {
          id: 'questionId',
          question: 'testQuestion',
          type: 'single-choice',
          isCustomAnswers: true,
          answers: [
            {
              id: 'answerId',
              answer: 'testAnswer',
              isMarked: false
            }
          ]
        }
      ],
      responses: [
        {
          userId: 'userId',
          responses: [
            {
              questionId: 'questionId'
            }
          ]
        }
      ],
    };

    (Survey.findById as jest.Mock).mockResolvedValue(survey);

    const result = await SurveyService.getSurveyById(surveyId);

    expect(result).toEqual(survey);
    expect(Survey.findById).toHaveBeenCalledWith(surveyId);
  });

  it('should throw an error if survey not found', async () => {
    const surveyId = 'nonexistentSurveyId';

    (Survey.findById as jest.Mock).mockResolvedValue(null);

    await expect(SurveyService.getSurveyById(surveyId)).rejects.toThrow('Survey not found');
    expect(Survey.findById).toHaveBeenCalledWith(surveyId);
  });
});

describe('updateSurvey', () => {
  it('should update and return a survey', async () => {
    const surveyId = 'surveyId';
    const surveyData: Partial<ISurvey> = { title: 'Updated Survey' };
    const updatedSurvey: Partial<ISurvey> = {
      id: 'surveyId',
      title: 'Updated Survey',
      description: 'Test Description',
      createDate: new Date(),
      lastModifiedDate: new Date(),
      creatorId: 'userId',
      status: 'draft',
      questions: [
        {
          id: 'questionId',
          question: 'testQuestion',
          type: 'single-choice',
          isCustomAnswers: true,
          answers: [
            {
              id: 'answerId',
              answer: 'testAnswer',
              isMarked: false
            }
          ]
        }
      ],
      responses: [
        {
          userId: 'userId',
          responses: [
            {
              questionId: 'questionId'
            }
          ]
        }
      ],
    };

    (Survey.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedSurvey);

    const result = await SurveyService.updateSurvey(surveyId, surveyData);

    expect(result).toEqual(updatedSurvey);
    expect(Survey.findByIdAndUpdate).toHaveBeenCalledWith(surveyId, surveyData, { new: true });
  });

  it('should throw an error if survey not found', async () => {
    const surveyId = 'nonexistentSurveyId';
    const surveyData: Partial<ISurvey> = { title: 'Updated Survey' };

    (Survey.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    await expect(SurveyService.updateSurvey(surveyId, surveyData)).rejects.toThrow('Survey not found');
    expect(Survey.findByIdAndUpdate).toHaveBeenCalledWith(surveyId, surveyData, { new: true });
  });
});

describe('deleteSurvey', () => {
  it('should delete and return a survey', async () => {
    const surveyId = 'surveyId';
    const deletedSurvey: Partial<ISurvey> = {
      id: 'surveyId',
      title: 'Test Survey',
      description: 'Test Description',
      createDate: new Date(),
      lastModifiedDate: new Date(),
      creatorId: 'userId',
      status: 'draft',
      questions: [
        {
          id: 'questionId',
          question: 'testQuestion',
          type: 'single-choice',
          isCustomAnswers: true,
          answers: [
            {
              id: 'answerId',
              answer: 'testAnswer',
              isMarked: false
            }
          ]
        }
      ],
      responses: [
        {
          userId: 'userId',
          responses: [
            {
              questionId: 'questionId'
            }
          ]
        }
      ],
    };

    (Survey.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedSurvey);

    const result = await SurveyService.deleteSurvey(surveyId);

    expect(result).toEqual(deletedSurvey);
    expect(Survey.findByIdAndDelete).toHaveBeenCalledWith(surveyId);
  });

  it('should throw an error if survey not found', async () => {
    const surveyId = 'nonexistentSurveyId';

    (Survey.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

    await expect(SurveyService.deleteSurvey(surveyId)).rejects.toThrow('Survey not found');
    expect(Survey.findByIdAndDelete).toHaveBeenCalledWith(surveyId);
  });
});
