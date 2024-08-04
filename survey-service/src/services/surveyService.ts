import Survey, { ISurvey } from '../models/Survey';

class SurveyService {
  public static async createSurvey(surveyData: ISurvey): Promise<ISurvey> {
    console.log('surveyData -------------', surveyData);
    
    const survey = new Survey(surveyData);
    console.log('survey -----------------', survey);
    
    await survey.save();
    console.log('survey -----------------', survey);
    
    return survey;
  }

  public static async getUserSurveys(userId: string): Promise<ISurvey[]> {
    const surveys = await Survey.find({ creatorId: userId });
    return surveys;
  }

  public static async getSurveyById(id: string): Promise<ISurvey> {
    const survey = await Survey.findById(id);
    if (!survey) {
      throw new Error('Survey not found');
    }
    return survey;
  }

  public static async updateSurvey(id: string, surveyData: Partial<ISurvey>): Promise<ISurvey> {
    const survey = await Survey.findByIdAndUpdate(id, surveyData, { new: true });
    if (!survey) {
      throw new Error('Survey not found');
    }
    return survey;
  }

  public static async deleteSurvey(id: string): Promise<ISurvey> {
    const survey = await Survey.findByIdAndDelete(id);
    if (!survey) {
      throw new Error('Survey not found');
    }
    return survey;
  }
}

export default SurveyService;
