import * as M from '../../message';
import { MessageHandlerContext, MessageHandler } from '../create-handlers';
import * as Types from '../../types';

export function projectRequest({ store }: MessageHandlerContext): MessageHandler<M.ProjectRequest> {
	const sender = store.getSender();

	return m => {
		const data = store.getProject();

		if (!data) {
			sender.send({
				id: m.id,
				type: M.MessageType.ProjectResponse,
				payload: {
					data: undefined,
					status: Types.ProjectStatus.None
				}
			});

			return;
		}

		sender.send({
			id: m.id,
			type: M.MessageType.ProjectResponse,
			payload: {
				data: data.toJSON(),
				status: Types.ProjectStatus.Ok
			}
		});
	};
}
