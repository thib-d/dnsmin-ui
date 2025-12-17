import {getApi} from "@app/utils/http";
import {ListResourceParams} from "@app/types/api";
import {zoneFromDTO, zonesPagedFromDTO, zoneToDTO} from "@app/features/zones/rzones/converters";
import {IRZoneInDTO, IRZonesPagedResponseDTO} from "@app/features/zones/rzones/dto";
import {IRZone, IRZonesPaged} from "@app/features/zones/rzones/models";

export const RZonesService = {
    async search(req?: ListResourceParams): Promise<IRZonesPaged> {
        const params = req !== undefined ? {
            filterModel: req.filterModel,
            sortModel: req.sortModel,
            paginationModel: req.paginationModel,
        } : {};

        const response = await getApi().post<IRZonesPagedResponseDTO>(
            "/zones/recursive/search", params
        );

        return zonesPagedFromDTO(response.data);
    },

    async get(id: string): Promise<IRZone> {
        const response = await getApi().get<IRZoneInDTO>(`/zones/recursive/${id}`);
        return zoneFromDTO(response.data);
    },

    async create(payload: Omit<IRZone, "id">): Promise<IRZone> {
        const dtoPayload = zoneToDTO(payload as IRZone);
        const response = await getApi().post<IRZoneInDTO>("/zones/recursive", dtoPayload);
        return zoneFromDTO(response.data);
    },

    async update(id: string, payload: Partial<IRZone>): Promise<IRZone> {
        const dtoPayload = zoneToDTO(payload as IRZone);
        const response = await getApi().put<IRZoneInDTO>(`/zones/recursive/${id}`, dtoPayload);
        return zoneFromDTO(response.data);
    },

    async remove(id: string): Promise<void> {
        await getApi().delete(`/zones/recursive/${id}`);
    },
};