import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {timezoneFromDTO, timezonesPagedFromDTO, timezoneToDTO} from "@app/features/system/timezones/converters";
import {ITimezoneInDTO, ITimezonesPagedResponseDTO} from "@app/features/system/timezones/dto";
import {ITimezone, ITimezonesPaged} from "@app/features/system/timezones/models";

export const SystemTimezonesService = {
    async search(req?: ListResourceParams): Promise<ITimezonesPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<ITimezonesPagedResponseDTO>(
            "/system/timezones/search", params
        );

        return timezonesPagedFromDTO(response.data);
    },

    async get(id: number): Promise<ITimezone> {
        const response = await getApi().get<ITimezoneInDTO>(`/system/timezones/${id}`);
        return timezoneFromDTO(response.data);
    },

    async create(payload: Omit<ITimezone, "id">): Promise<ITimezone> {
        const dtoPayload = timezoneToDTO(payload as ITimezone);
        const response = await getApi().post<ITimezoneInDTO>("/system/timezones", dtoPayload);
        return timezoneFromDTO(response.data);
    },

    async update(id: number, payload: Partial<ITimezone>): Promise<ITimezone> {
        const dtoPayload = timezoneToDTO(payload as ITimezone);
        const response = await getApi().put<ITimezoneInDTO>(`/system/timezones/${id}`, dtoPayload);
        return timezoneFromDTO(response.data);
    },

    async remove(id: number): Promise<void> {
        await getApi().delete(`/system/timezones/${id}`);
    },
};