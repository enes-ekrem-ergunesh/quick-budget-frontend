import { CustomError } from 'ts-custom-error';

export class MissingAccessTokenError extends CustomError{
	public constructor(
		message: string = "Access token is missing",
	) {
		super(message)
	}
}