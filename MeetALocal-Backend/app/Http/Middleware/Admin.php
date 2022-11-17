<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;
class Admin
{
    
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if($user && $user->type_id==3){
            return $next($request);
        }
        return redirect(route("not-found"));
    }
}
