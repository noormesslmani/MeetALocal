<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;
class Foreigner
{
    
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if($user && $user->type_id==2){
            return $next($request);
        }
        return redirect(route("not-found"));
    }
}
