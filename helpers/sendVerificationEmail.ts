import { resend } from '../lib/resend'
import VerificationEmail from '../emails/emailTemplate'
import { TapiResponse } from '@/types/type'

export async function sendVerificationEmail(
    username: string,
    email: string,
    verifyCode: string
): Promise<TapiResponse> {
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev>',
            to: email,
            subject: 'Signup Verificaiton Code',
            react: VerificationEmail({username,otp : verifyCode}) ,
          });

        return { success: false, message: 'Error in sendVerificationError' }
    } catch (error) {
        console.error('Erron in sendVerificationError', error)
        return { success: false, message: 'Error in sendVerificationError' }
    }
}