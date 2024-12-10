
<div class="row row-50 justify-content-md-center justify-content-xl-end justify-content-xxl-end">
    
    <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-center">

    @if (app()->getLocale() == "en")
        {!! $day->text_en !!}
    @else
        {!! $day->text_lt !!}
    @endif
    
    </div>
    
</div>


<div class="row mt-5" id="addKomentaras" data-url="{{url('comment/')}}">
    <div class="col-12">

        <h5 class="text-left mb-3 koment-h-color">Jūsų atsakymas</h5>
        @csrf


        <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-person-fill koment-ico-color"></i></span>
            <input name="vardas" type="text" class="form-control clean-after" placeholder="{{__('Atsakymas')}}" aria-label="{{__('Atsakymas')}}">
            <button type="submit" id="doAddKomentaras" class="btn btn-success">{{__('Pateikti')}}</button>
        </div>


        <input type="hidden" name="day" value="{{ $day->id }}">
        <input type="hidden" name="lang" value="{{ app()->getLocale() }}">


        <div class="formReply mt-5 mb-3"></div>



    </div>
</div>







<div class="row mt-5" id="listKomentaras">
    <div class="col-12">

        <div class="listKomentaras">

        </div>

    </div>
</div>

