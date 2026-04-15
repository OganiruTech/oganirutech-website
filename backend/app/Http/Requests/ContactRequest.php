<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email'   => ['required', 'email:rfc,dns', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required'   => 'An email address is required.',
            'email.email'      => 'Please provide a valid email address.',
            'message.required' => 'A message is required.',
            'message.min'      => 'Your message must be at least 10 characters.',
            'message.max'      => 'Your message cannot exceed 5000 characters.',
        ];
    }

    // Return JSON error responses instead of redirects
    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}