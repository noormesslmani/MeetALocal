<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;
class Local
{
    
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if($user && $user->type_id==1){
            return $next($request);
        }
        return redirect(route("not-found"));
    }
}
