import axios from "@/api";
import type { SuccessResponse, GetTeacherSubjects,  InsertItemResponse } from "@/types/responses";

class SubectService {
  async addTeacherSubject(subjectName: string, teacherId: number) {
    const { data } = await axios.post<InsertItemResponse>("/subjects", {
      subjectName,
      teacherId,
    });
    return data;
  }

  async loadAllTeacherSubjects(teacherId: number) {
    const { data } = await axios.get<GetTeacherSubjects>("/subjects/" + teacherId);
    return data;
  }

  async deleteTeacherSubject(subjectId: number) {
    const { data } = await axios.delete<SuccessResponse>("/subjects/" + subjectId);
    return data;
  }
}

export default new SubectService();
