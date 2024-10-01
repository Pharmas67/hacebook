<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;


class AuthController extends Controller {
    public function register(Request $request){
        if(!$request->expectsJson()){
            return redirect('/');
        }

        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string',
            'password2' => 'required|string'
        ]);

        $input = $request->input();
        return $input;


        return response()->json([
            'message' => 'jooo',
            'data' => $input
        ],200);
    }
}