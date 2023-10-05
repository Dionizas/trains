<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;


class DayController extends Controller
{

    public function index()
    {
        $days = Day::orderBy('id', 'asc')->paginate(50);
        return view('days.index', compact('days'));
    }

    public static function list() {
        $days = Day::orderBy('id', 'asc')->paginate(50);
        return $days;
    }

    public function create()
    {
        return view('days.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name_lt' => 'required',
            'name_en' => 'required',
        ]);
        
        Day::create($request->post());

        return redirect()->route('days.index')->with('success','Day has been created successfully.');
    }


    public function show(Day $day)
    {
        return view('days.show', compact('day'));
    }


    public function edit(Day $day)
    {
        $files = File::allFiles(public_path('media\images'));
        return view('days.edit', compact('day', 'files'));
    }


    public function update(Request $request, Day $day)
    {
        $request->validate([
            'name_lt' => 'required',
            'name_en' => 'required',
        ]);

        $day->fill($request->post())->save();

        return redirect()->route('days.index')->with('success','Diena sėkmingai atnaujinta.');
    }




}
