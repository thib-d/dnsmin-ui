import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {taskJobFromDTO, taskJobsPagedFromDTO} from "@app/features/tasks/jobs/converters";
import {ITaskJobInDTO, ITaskJobsPagedResponseDTO} from "@app/features/tasks/jobs/dto";
import {ITaskJob, ITaskJobsPaged} from "@app/features/tasks/jobs/models";

export const TaskJobsService = {
    async search(req?: ListResourceParams): Promise<ITaskJobsPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<ITaskJobsPagedResponseDTO>(
            "/tasks/jobs/search", params
        );

        return taskJobsPagedFromDTO(response.data);
    },

    async get(id: string): Promise<ITaskJob> {
        const response = await getApi().get<ITaskJobInDTO>(`/tasks/jobs/${id}`);
        return taskJobFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/tasks/jobs/${id}`);
    },
};